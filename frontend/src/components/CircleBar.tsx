import { Component, createEffect, createSignal } from "solid-js";
import { CircularProgress, CircularProgressIndicator, CircularProgressLabel } from "@hope-ui/solid";
import "./styles/CircleBar.scss";

const CircleBar: Component<{value: number}> = (props) => {
    const [currValue, setCurrValue] = createSignal(0);
    let interval = setInterval(() => setCurrValue(currValue() + 1), 25);
    createEffect(() => {if (currValue() >= props.value) clearInterval(interval)});

    return (
        <div class="center col-4">
            <p class="circle-bar-title">Toxicity</p>
            <CircularProgress value={currValue()} size="120px">
                <CircularProgressIndicator withRoundCaps color={currValue() <= 33? "$success10": currValue() <= 66? "$warning10": "$danger10"}/>
                <CircularProgressLabel fontSize="30px"/>
            </CircularProgress>
        </div>
    );
}

export default CircleBar;
