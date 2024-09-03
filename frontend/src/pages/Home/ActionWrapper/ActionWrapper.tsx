import { useState } from "react";
import NavigationMenu from "./NavigationMenu";

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
        return <div>1</div>

      case contents.second:
        return <div>2</div>

      case contents.third:
        return <div>3</div>
      default:
        break;
    }
  }

  return (
    <div className={`mx-5 ${className}`}>
        <NavigationMenu activeComponent={activeComponent} togglePage={setActiveComponent} contents={contents}/>
        <div className="bg-third dark:bg-fourth rounded mt-5 md:mt-2">
            {renderContent()}
        </div>
    </div>
  )
}

export default MenuWrapper