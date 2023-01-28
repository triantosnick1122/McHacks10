/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import "./index.scss";
import App from "./App";

render(() => <Router><App/></Router>, document.getElementById("__page") as HTMLElement);
