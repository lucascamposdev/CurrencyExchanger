import getCookieData from "@/utils/getCookieData";
import { RiMastercardFill } from "react-icons/ri";

type Props = {
  className?: string;
}

const Balance = ({ className }: Props) => {
  const cookieObject = getCookieData();


  return (
    <div className={`${className} m-5 p-5 rounded-xl flex justify-center`}>
      <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Welcome, <b>{cookieObject?.userData?.name}</b> <em>!</em></p>
          <Card/>

          <AccountDetails/>
      </div>
    </div>
  )
}

const Card = () => {
  return(
    <div className="font-mono w-[375px] h-[215px] shadow bg-gradient-to-b from-red-300 to-purple-600 rounded-xl flex flex-col text-white p-5">
      <RiMastercardFill size={50}/>
      <div className="text-2xl mt-[30px] flex gap-5"><p>1501</p><p>9614</p><p>0105</p><p>0405</p></div>
      <span className="flex mt-auto text-xl">
        <p>01/28</p>
        <p className="ms-auto">CVV ***</p>
      </span>
    </div>
  )
}

const AccountDetails = () => {
  return(
    <div className="mt-2 space-y-3">
      <div className="space-y-3 bg-third dark:bg-fourth p-5 rounded-2xl shadow">
        <Detail label="Balance" data="$ 10.000"/>
      </div>
      <div className="space-y-3 bg-third dark:bg-fourth p-5 rounded-2xl shadow">
        <p className="font-bold">Information</p>
        <hr className="border-fourth dark:border-third opacity-20"/>
        <Detail label="Status" data="Active"/>
        <Detail label="Currency" data="USD"/>
      </div>
    </div>
  )
}

type DetailProps = {
  label: string;
  data: string;
}

const Detail = ({ label, data }: DetailProps) => {
  return(
    <div className="flex">
      <p className="">{label}</p>
      <p className="ms-auto font-bold">{data}</p>
    </div>
  )
}


export default Balance