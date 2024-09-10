import { useState } from "react";
import NavigationMenu from "./NavigationMenu";
import Convert from "./MenuItems/Convert";

export type ContentsType = {
  first: string;
  second: string;
  third: string;
}

const contents: ContentsType = {
  first: 'Convert',
  second: 'Send',
  third: 'Transactions'
}

type Props = {
    className?: string;
}

const MenuWrapper = ({ className }: Props) => {
  const [activeComponent, setActiveComponent] = useState<string>(contents.first);
  
  const renderContent = () =>{
    switch (activeComponent) {
      case contents.first:
        return <Convert/>

      case contents.second:
        return <div>2</div>

      case contents.third:
        return <div>3</div>
      default:
        break;
    }
  }

  return (
    <div className={`m-5  ${className}`}>
        <NavigationMenu activeComponent={activeComponent} togglePage={setActiveComponent} contents={contents}/>
        <div className="bg-third dark:bg-fourth rounded mt-5 md:mt-2  h-[475px] overflow-y-scroll border border-opacity-20 dark:border-opacity-20 border-secondary dark:border-primary ">
            {renderContent()}
        </div>
    </div>
  )
}

export default MenuWrapper