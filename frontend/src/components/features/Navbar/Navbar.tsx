import UserMenu from "./UserMenu/UserMenu"
import { RiExchange2Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-start h-[65px]">
        <UserMenu/>
        <h1 className="font-bold font-nunito flex items-center gap-2 ms-5">
        <RiExchange2Fill size={20}/>
        Currency Exchanger
        </h1>
    </nav>
  )
}

export default Navbar