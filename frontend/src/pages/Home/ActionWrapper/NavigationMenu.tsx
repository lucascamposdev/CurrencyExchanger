import { BsCurrencyExchange } from "react-icons/bs";
import { BsSendFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { ContentsType } from "./ActionWrapper";

type NavigationMenuProps = {
    activeComponent: string;
    contents: ContentsType;
    togglePage: (page: string) => void;
  };
  
  const NavigationMenu = ({ activeComponent, togglePage, contents }: NavigationMenuProps) => {
    return (
      <div className="flex lg:justify-normal justify-around overflow-clip gap-2">
        <Button
          icon={<BsCurrencyExchange size={20} />}
          onClick={() => togglePage(contents.first)}
          isActive={activeComponent === contents.first}
        >
          Convert
        </Button>
  
        <Button
          icon={<BsSendFill size={20} />}
          onClick={() => togglePage(contents.second)}
          isActive={activeComponent === contents.second}
        >
          Send
        </Button>
  
        <Button
          icon={<GrTransaction size={20} />}
          onClick={() => togglePage(contents.third)}
          isActive={activeComponent === contents.third}
        >
          Transactions
        </Button>
      </div>
    );
  };
  
  type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    icon: React.ReactNode;
    isActive: boolean;
  };
  
  const Button = ({ children, icon, isActive, ...props }: ButtonProps) => {
    return (
      <button
        className={`flex text-sm sm:flex-1 justify-center p-3 sm:rounded rounded-full sm:flex-row flex-col items-center gap-3 bg-third text-secondary dark:bg-fourth dark:text-primary ${
          isActive ? 'invert' : ''
        }`}
        {...props}
      >
        {icon}
        <p className="sm:block hidden">{children}</p>
      </button>
    );
  };
  
export default NavigationMenu;