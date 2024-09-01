import getCookieData from "@/utils/getCookieData";

type Props = {
  className?: string;
}

const Balance = ({ className }: Props) => {
  const cookieObject = getCookieData();


  return (
    <div className={`${className} m-5 p-5 rounded-xl flex justify-center`}>
      <div className="flex flex-col gap-3">
          <p className="text-xl font-bold">Welcome, {cookieObject?.userData?.name}!</p>
          <Card/>

          <AccountDetails/>
      </div>
    </div>
  )
}

const Card = () => {
  return(
    <div className="w-[375px] h-[225px] shadow bg-gradient-to-b from-blue-600 to-purple-600 rounded-xl flex flex-col text-white p-5">
      <p className="font-bold text-3xl">CE</p>
      <div className="text-2xl mt-[50px] flex gap-5 font-mono"><p>1501</p><p>9614</p><p>0105</p><p>0405</p></div>
      <span className="flex mt-auto text-xl">
        <p>01/28</p>
        <p className="ms-auto">CVV ***</p>
      </span>
    </div>
  )
}

const AccountDetails = () => {
  return(
    <div className="space-y-3 bg-third dark:bg-fourth p-5 mt-3 rounded-2xl shadow">
      <p className="font-bold">Information</p>
      <hr className="border-fourth dark:border-third opacity-20"/>
      <Detail label="Balance" data="$ 10.000"/>
      <Detail label="Status" data="Active"/>
      <Detail label="Currency" data="USD"/>
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