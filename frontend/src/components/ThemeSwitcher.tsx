import LightModeIcon from '@suid/icons-material/LightMode';
import DarkModeIcon from '@suid/icons-material/DarkMode';
import { Button } from 'solid-bootstrap';
import "./styles/ThemeSwitcher.scss";
import { getTheme, setTheme, Theme } from '../shared/theme';

const THEME_KEY = "__local_theme";

const ThemeSwitcher = () => {
    let currentTheme = localStorage.getItem(THEME_KEY);
    if (currentTheme === Theme.LIGHT) setTheme(Theme.LIGHT);

    const handleChange = () => {
        if (getTheme() === Theme.LIGHT) {
            setTheme(Theme.DARK);
            localStorage.removeItem(THEME_KEY);
        } else {
            setTheme(Theme.LIGHT);
            localStorage.setItem(THEME_KEY, Theme.LIGHT);
        }
    }

    return (
        <Button class="theme-switcher" onClick={handleChange} variant={"outline-" + (getTheme() === Theme.LIGHT? "dark": "light")}>
            {getTheme() === Theme.LIGHT? <DarkModeIcon/>: <LightModeIcon/>}
        </Button>
    );
}

export default ThemeSwitcher;
