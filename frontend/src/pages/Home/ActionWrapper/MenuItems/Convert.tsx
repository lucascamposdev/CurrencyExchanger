import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket"
import getCurrencySymbol from "@/utils/getCurrencySymbol";
import Decimal from "decimal.js";

const Convert = () => {
    const currencies = useSocket().currencies;

    if (currencies == null) return;

    return (
        <div className="p-3 space-y-2 flex flex-col">
            <div className="flex p-2 font-bold items-center">
                <div className="bg-green-500 rounded-full h-[10px] w-[10px] mr-2"></div>
                <p>Live</p>
                <em className="text-grey-500 opacity-50 text-[12px] ms-auto">Updated At {currencies.LastUpdate}</em>
            </div>
            {currencies.Rates
                .filter(item => item.Currency !== currencies.BaseCurrency) 
                .map(item => (
                    <CurrencyBox 
                        key={item.Currency} 
                        baseCurrency={currencies.BaseCurrency} 
                        currency={item.Currency} 
                        rate={item.Rate} 
                    />
                ))}
        </div>
    )
}

type CurrencyBoxProps = {
    currency: string;
    rate: number;
    baseCurrency: string;
}

const CurrencyBox = ({ currency, rate, baseCurrency }: CurrencyBoxProps) => {
    const userData = useAuth().userData;

    if(userData == null) return;

    const convertedValue = (new Decimal(userData.balance).toNumber() * rate).toFixed(2);

    return (
        <div className="hover:brightness-90 dark:hover:brightness-75 hover:cursor-pointer border border-secondary dark:border-primary rounded p-2 flex items-center bg-primary dark:bg-secondary dark:text-primary border-opacity-20 dark:border-opacity-20">
            <img src={`/images/flags/${currency}.svg`} alt="Currency Flag" className="mx-4 h-[25px] rounded"/>
            <p className="font-bold">{currency}</p>

            <span className="flex flex-col ms-auto  w-[130px]">
                <p className="font-bold">{getCurrencySymbol(currency)} {convertedValue}</p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">1 {baseCurrency} = {rate} {currency}</p>
            </span>
        </div>
    )
}

export default Convert