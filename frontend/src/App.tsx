import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HomePage from "./pages/Home";
import Error404 from "./components/Error404";

const App: Component = () => {
    return (
        <Routes>
            <Route path="/" component={HomePage}/>
            <Route path="*" component={Error404}/>
        </Routes>
    )
};

export default App;
