import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/context/ThemeContext"

const ThemeToggler = () => {

  const { toggleTheme } = useTheme();

    const handleThemeToggler = () :void =>{
      toggleTheme();
    }

  return (
    <div className="flex items-center">
        <p>Theme</p>
        <Switch className="ml-auto" onClick={() => handleThemeToggler()}/>
    </div>
  )
}

export default ThemeToggler