import BalanceWrapper from "./BalanceWrapper/BalanceWrapper";
import MenuWrapper from "./MenuWrapper/MenuWrapper";

const Home = () => {
  return (
    <div className=" flex-1 flex lg:flex-row flex-col font-nunito">
      <BalanceWrapper className="lg:flex-1"/>
      <MenuWrapper className="lg:flex-1"/>
    </div>
  )
}

export default Home;
