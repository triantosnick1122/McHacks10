import { Component, createSignal, onMount } from "solid-js";
import NavMenu from "../components/NavManu";
import { Button, Col, Form, Image, InputGroup, Row, Spinner, Table } from "solid-bootstrap";
import SearchIcon from '@suid/icons-material/Search';
import "./styles/Leaderboard.scss";
import CircleBar from "../components/CircleBar";
import TypingText from "../components/TypingText";
import { useColorMode } from "@hope-ui/solid";

const [data, setData] = createSignal<any>(undefined);

const BASE_URL = "http://toxicity-analyzer-app.canadacentral.cloudapp.azure.com:8000/reports/posts/generate/";

const Spin: Component = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <div class="center spin-div"><Spinner class="spin" animation="border" variant={colorMode() === "light"? "dark": "light"} role="status"/></div>;
}

const makeRequest = () => {
    fetch(BASE_URL + "scoreboard")
    .then(resp => resp.json())
    .then(data => setData(data));
}

const MainPage: Component = () => {
    onMount(() => makeRequest());

    return (
        data() === undefined? <Spin/>:
            <div class="center card-div">
                <CircleBar title="Toxicity" max={100} value={data().score}/>
                <CircleBar title="Innacuracy" max={100} value={37}/>
                <div class="center col-3" style={{display: "inline-block"}}>
                    <p class="circle-bar-title">Posts Analyzed</p>
                    <p class="circle-bar-title">{data().records_analyzed}</p>
                </div>
            </div>
    );
};

const HomePage: Component = () => {
    return (
        <>
            <NavMenu/>
            <MainPage/>
        </>
    );
}

export default HomePage;
