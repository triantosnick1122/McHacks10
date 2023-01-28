import { Component } from "solid-js";
import { A } from "@solidjs/router";
import "./styles/Error404.scss";

const Error404: Component = () => {
    return (
        <>
            <br/>
            <h1 class="error-404-text center">Roses are red. Violets are blue.</h1>
            <h1 class="error-404-text center">Error 404 just landed for you!</h1>
            <br/>
            <p class="center">Did you get lost? Go back to our <A href="/">main page</A>.</p>
        </>
    );
}

export default Error404;
