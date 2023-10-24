import { Component, createEffect, createSignal } from "solid-js";
import { CircularProgress, CircularProgressIndicator, CircularProgressLabel } from "@hope-ui/solid";
import "./styles/CircleBar.scss";

const CircleBar: Component<{title: string, value: number, max: number}> = (props) => {
    const [currValue, setCurrValue] = createSignal(0);
    const [alpha, setAlpha] = createSignal(0);
    let valueInterval = setInterval(() => setCurrValue(currValue() + 1), 1);
    let alphaInterval = -1;

    createEffect(() => {
        if (currValue() >= props.value) {
            clearInterval(valueInterval);
            alphaInterval = setInterval(() => setAlpha(alpha() + 0.01), 1);
        }
    });

    createEffect(() => {if (alpha() >= 1) clearInterval(alphaInterval);});

    return (
        <div class="center col-3" style={{display: "inline-block"}}>
            <p class="circle-bar-title">{props.title}</p>
            <CircularProgress max={props.max} value={currValue()} size="120px">
                <CircularProgressIndicator withRoundCaps color={currValue() <= 33? "$success10": currValue() <= 66? "$warning10": "$danger10"}/>
                <CircularProgressLabel style={{opacity: alpha()}} fontSize="30px"/>
            </CircularProgress>
        </div>
    );
}

export default CircleBar;
