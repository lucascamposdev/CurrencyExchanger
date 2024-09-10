import BalanceWrapper from "./BalanceWrapper/BalanceWrapper";
import ActionWrapper from "./ActionWrapper/ActionWrapper";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

const Home = () => {
  const { connectToWebSocket } = useSocket();

  useEffect(() =>{
    connectToWebSocket();
  }, [])

  return (
    <div className="flex xl:flex-row flex-col font-nunito sm:mx-20 h-auto">
      <BalanceWrapper className="lg:flex-1"/>
      <ActionWrapper className="lg:flex-1"/>
    </div>
  )
}

export default Home;
