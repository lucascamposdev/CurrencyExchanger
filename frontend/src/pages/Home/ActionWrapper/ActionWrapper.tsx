import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

type Props = {
    className?: string;
}

const MenuWrapper = ({ className }: Props) => {
  const [activeComponent, setActiveComponent] = useState<string>('convert');
  
  return (
    <div className={`mx-5 ${className}`}>
        <NavigationMenu activeComponent={activeComponent} togglePage={setActiveComponent}/>
    </div>
  )
}

export default MenuWrapper