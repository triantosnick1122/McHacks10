/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./index.scss";
import App from "./App";
import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";

const config: HopeThemeConfig = {
    initialColorMode: "dark"
}

render(() => <Router><HopeProvider config={config}><App/></HopeProvider></Router>, document.getElementById("__page") as HTMLElement);
