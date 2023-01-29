import { createSignal, Component, createEffect } from "solid-js";
import "./styles/TypingText.scss";

const TypingText: Component<{startAfter: number, text: string, finishAfter: number}> = (props) => {
    let [timer, setTimer] = createSignal(0);
    let [currCount, setCurrCount] = createSignal(0);
    let [addedLine, setAddedLine] = createSignal(0);

    let interval = -1;
    let lineBlinking = -1;

    setInterval(() => setTimer(timer() + 1), 1000);
    createEffect(() => {
        if (interval === -1 && timer() >= props.startAfter) {
            interval = setInterval(() => setCurrCount(currCount()+1), 40);
            setAddedLine(1);
            lineBlinking = setInterval(() => setAddedLine((addedLine() === 0)? 1: 0), 1000);
        }
        if (props.finishAfter > 0 && timer() >= props.finishAfter) {
            clearInterval(lineBlinking);
            setAddedLine(0);
        }
    });

    createEffect(() => {if (currCount() >= props.text.length) clearInterval(interval);});

    return (
        <p class="center text-header">
            {
                (currCount() === 0)? "":
                (props.text.charAt(currCount()-1) === " ")?
                    <span>{props.text.slice(0, currCount()-1)}&nbsp;</span>:
                    props.text.slice(0, currCount())
            }
            {
                <span style={{visibility: addedLine() === 1? "visible": "hidden"}}>|</span>
            }
        </p>
    )
}

export default TypingText;
