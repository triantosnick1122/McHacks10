import { Component, createEffect, createSignal } from "solid-js";
import { CircularProgress, CircularProgressIndicator, CircularProgressLabel } from "@hope-ui/solid";

const CircleBar: Component<{value: number}> = (props) => {
    const [currValue, setCurrValue] = createSignal(0);

    let interval = setInterval(() => setCurrValue(currValue() + 9 > props.value? props.value: currValue() + 9), 50);
    createEffect(() => {if (currValue() >= props.value) clearInterval(interval)});

    return (
        <CircularProgress value={currValue()} size="120px">
            <CircularProgressIndicator withRoundCaps color={currValue() <= 33? "$success10": currValue() <= 66? "$warning10": "$danger10"}/>
            <CircularProgressLabel fontSize="30px"/>
        </CircularProgress>
    );
}

export default CircleBar;
