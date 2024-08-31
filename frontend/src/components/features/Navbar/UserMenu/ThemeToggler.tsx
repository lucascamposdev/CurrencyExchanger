import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/context/ThemeContext"

const ThemeToggler = () => {

  const { toggleTheme, theme } = useTheme();

    const handleThemeToggler = () :void =>{
      toggleTheme();
    }

  return (
    <div className="flex items-center">
        <p>Theme</p>
        <Switch className="ml-auto" onClick={() => handleThemeToggler()} checked={theme == 'dark' ? true : false}/>
    </div>
  )
}

export default ThemeToggler