import { createSignal } from "solid-js";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
};

export let [getTheme, setTheme] = createSignal(Theme.DARK);
