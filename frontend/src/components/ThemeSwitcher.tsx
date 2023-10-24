import LightModeIcon from '@suid/icons-material/LightMode';
import DarkModeIcon from '@suid/icons-material/DarkMode';
import { Button } from 'solid-bootstrap';
import "./styles/ThemeSwitcher.scss";
import { useColorMode } from '@hope-ui/solid';

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button class="theme-switcher" onClick={toggleColorMode} variant={"outline-" + (colorMode() === "light"? "dark": "light")}>
            {colorMode() === "light"? <DarkModeIcon/>: <LightModeIcon/>}
        </Button>
    );
}

export default ThemeSwitcher;
