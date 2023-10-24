import { createSignal, Component, createEffect } from "solid-js";
import "./styles/TypingText.scss";

const TypingText: Component<{startWithLine: boolean, startAfter: number, text: string, finishAfter: number}> = (props) => {
    let [timer, setTimer] = createSignal(0);
    let [currCount, setCurrCount] = createSignal(0);
    let [addedLine, setAddedLine] = createSignal(false);

    let interval = -1;
    let lineBlinking = -1;
    let timerInterval = setInterval(() => setTimer(timer() + 1), 1000);

    createEffect(() => {
        if (interval === -1 && timer() >= props.startAfter) {
            interval = setInterval(() => setCurrCount(currCount()+1), 40);
            setAddedLine(props.startWithLine);
            lineBlinking = setInterval(() => setAddedLine(!addedLine()), 1000);
        }
        if (props.finishAfter > 0 && timer() >= props.finishAfter) {
            clearInterval(lineBlinking);
            clearInterval(timerInterval);
            setAddedLine(false);
        }
        if (props.finishAfter <= 0 && timer() >= props.startAfter) {
            clearInterval(timerInterval)
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
                <span style={{visibility: addedLine()? "visible": "hidden"}}>|</span>
            }
        </p>
    )
}

export default TypingText;
