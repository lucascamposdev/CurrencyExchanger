import BalanceWrapper from "./BalanceWrapper/BalanceWrapper";
import ActionWrapper from "./ActionWrapper/ActionWrapper";

const Home = () => {
  return (
    <div className=" flex-1 flex lg:flex-row flex-col font-nunito sm:mx-20">
      <BalanceWrapper className="lg:flex-1"/>
      <ActionWrapper className="lg:flex-1"/>
    </div>
  )
}

export default Home;
