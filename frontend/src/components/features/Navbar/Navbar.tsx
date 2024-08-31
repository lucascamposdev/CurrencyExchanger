import UserMenu from "./UserMenu/UserMenu"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center px-3 pt-5">
        <UserMenu/>
        <h1 className="text-xl">Exchange</h1>
    </nav>
  )
}

export default Navbar