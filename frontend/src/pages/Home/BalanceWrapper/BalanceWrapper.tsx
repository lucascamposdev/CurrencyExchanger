import { useAuth } from "@/hooks/useAuth";
import getCurrencySymbol from "@/utils/getCurrencySymbol";
import Decimal from "decimal.js";
import { RiMastercardFill } from "react-icons/ri";

type Props = {
  className?: string;
}

const Balance = ({ className }: Props) => {
  const userData = useAuth().userData;

  return (
    <div className={`${className} m-5 p-5 rounded-xl flex justify-center`}>
      <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Welcome, <b>{userData?.name}</b> <em>!</em></p>
          <Card/>

          <AccountDetails/>
      </div>
    </div>
  )
}

const Card = () => {
  return(
    <div className="font-mono w-[375px] h-[215px] shadow bg-gradient-to-b from-blue-800 to-blue-500 rounded-xl flex flex-col text-white p-5">
      <RiMastercardFill size={50}/>
      <span className="flex mt-auto text-xl">
        <p>01/28</p>
        <p className="ms-auto">CVV ***</p>
      </span>
    </div>
  )
}

const AccountDetails = () => {
const userData = useAuth().userData;
  return(
    <div className="mt-2 space-y-3">
      <div className="space-y-3 bg-third dark:bg-fourth p-5 rounded-2xl shadow">
        <BalanceNumber label="Balance" currency={userData?.currency ?? '?'} data={userData ? userData.balance : new Decimal(0.00)}/>
      </div>
      <div className="space-y-3 bg-third dark:bg-fourth p-5 rounded-2xl shadow">
        <p className="font-bold">Information</p>
        <hr className="border-fourth dark:border-third opacity-20"/>
        <Detail label="Status" data="Active"/>
        <Detail label="Currency" data={userData?.currency}/>
      </div>
    </div>
  )
}

type DetailProps = {
  label: string;
  data: string | undefined;
}

const Detail = ({ label, data }: DetailProps) => {

  return(
    <div className="flex">
      <p className="">{label}</p>
      <p className="ms-auto font-bold">{data}</p>
    </div>
  )
}

type BalanceProps = {
  label: string;
  data: Decimal;
  currency: string;
}

const BalanceNumber = ({ label, data, currency }: BalanceProps) => {

  const displayData = data.toFixed(2) 

  return(
    <div className="flex">
      <p className="">{label}</p>
      <p className="ms-auto font-bold">{getCurrencySymbol(currency)} {displayData}</p>
    </div>
  )
}


export default Balance