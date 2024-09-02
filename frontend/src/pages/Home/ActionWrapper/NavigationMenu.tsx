import { BsCurrencyExchange } from "react-icons/bs";
import { BsSendFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

type NavigationMenuProps = {
    activeComponent: string;
    togglePage: (page: string) => void;
  };
  
  const NavigationMenu = ({ activeComponent, togglePage }: NavigationMenuProps) => {
    return (
      <div className="flex lg:justify-normal justify-around overflow-clip gap-2">
        <Button
          icon={<BsCurrencyExchange size={20} />}
          onClick={() => togglePage('convert')}
          isActive={activeComponent === 'convert'}
        >
          Convert
        </Button>
  
        <Button
          icon={<BsSendFill size={20} />}
          onClick={() => togglePage('send')}
          isActive={activeComponent === 'send'}
        >
          Send
        </Button>
  
        <Button
          icon={<GrTransaction size={20} />}
          onClick={() => togglePage('transactions')}
          isActive={activeComponent === 'transactions'}
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
          isActive ? 'bg-black text-white dark:bg-white dark:text-black' : ''
        }`}
        {...props}
      >
        {icon}
        <p className="sm:block hidden">{children}</p>
      </button>
    );
  };
  
export default NavigationMenu;