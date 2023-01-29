import { Component, createSignal } from "solid-js";
import NavMenu from "../components/NavManu";
import { Button, Col, Form, Image, InputGroup, Row, Spinner } from "solid-bootstrap";
import SearchIcon from '@suid/icons-material/Search';
import "./styles/Home.scss";
import CircleBar from "../components/CircleBar";
import TypingText from "../components/TypingText";
import { useColorMode } from "@hope-ui/solid";

const [maxNumberOfPosts, setMaxNumberOfPosts] = createSignal("50");
const [order, setOrder] = createSignal("new");
const [redditSublink, setRedditSublink] = createSignal("");
const [data, setData] = createSignal<any>(undefined);
const [showSpinner, setShowSpinner] = createSignal(false);

const BASE_URL = "http://toxicity-analyzer-app.canadacentral.cloudapp.azure.com:8000/reports/posts/generate/";

const makeRequest = () => {
    fetch(BASE_URL + redditSublink() + "/" + order() + "/" + maxNumberOfPosts(), {method: "GET"})
    .then(resp => resp.json())
    .then(data => {
        setData(data);
        setShowSpinner(false);
    });
}

// Animation
const [opacity, setOpacity] = createSignal(1);
const [paddingTop, setPaddingTop] = createSignal(200);
const [paddingBottom, setPaddingBottom] = createSignal(100);
let opacityInterval = -1;
let paddingTopInterval = -1;
let paddingBottomInterval = -1;
const STEP = 10;
const INTERVAL = 1;

const Spin: Component = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <div class="center spin-div"><Spinner class="spin" animation="border" variant={colorMode() === "light"? "dark": "light"} role="status"/></div>;
}

const MainForm: Component = () => {
    /** Called when the user clicks on the submit button. */
    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        setData(undefined);

        // Animation
        if (opacity() !== 0) {
            opacityInterval = setInterval(() => {
                if (opacity() - 0.1 <= 0) {
                    setOpacity(0);
                    clearInterval(opacityInterval);
                    setPaddingTop(360);
                    paddingTopInterval = setInterval(() => {
                        if (paddingTop() - STEP <= 0) {
                            setPaddingTop(0);
                            clearInterval(paddingTopInterval);
                            paddingBottomInterval = setInterval(() => {
                                if (paddingBottom() + STEP >= 750) {
                                    setPaddingBottom(0);
                                    clearInterval(paddingBottomInterval);
                                    setShowSpinner(true);
                                } else {
                                    setPaddingBottom(paddingBottom() + STEP);
                                }
                            }, INTERVAL);
                        } else {
                            setPaddingTop(paddingTop() - STEP);
                        }
                    }, INTERVAL);
                } else {
                    setOpacity(opacity() - 0.1);
                }
            }, 20);
        } else {
            setShowSpinner(true);
        }

        makeRequest();
    };

    return (
        <Form onSubmit={handleSubmit} class="reddit-subreddit-search-bar-form">
            <Row>
                <Col>
                    <InputGroup class="mb-3">
                        <InputGroup.Text id="reddit-subredditlink-addon"><Image class="reddit-logo" src="/reddit-logo.png" alt="reddit.com"/>&nbsp;&nbsp;r/</InputGroup.Text>
                        <Form.Control type="text" placeholder="Search a subreddit" value={redditSublink()} onInput={e => setRedditSublink(e.currentTarget.value)} aria-label="Subreddit" aria-describedby="reddit-subredditlink-addon"/>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <InputGroup class="mb-3">
                        <InputGroup.Text id="reddit-subredditlink-addon">Index by</InputGroup.Text>
                        <Form.Select value={order()} onChange={e => setOrder(e.currentTarget.value)}>
                            <option value="new">New</option>
                            <option value="top">Top</option>
                            <option value="hot">Hot</option>
                            <option value="controversial">Controversial</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup class="mb-3">
                        <InputGroup.Text id="reddit-subredditlink-addon">Max # of Posts</InputGroup.Text>
                        <Form.Select value={maxNumberOfPosts()} onChange={e => setMaxNumberOfPosts(e.currentTarget.value)}>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
            </Row>

            <div class="center"><Button type="submit" disabled={redditSublink() === ""}><SearchIcon/> Search</Button></div>
        </Form>
    );
}

const MainPage: Component = () => {
    return (
        <div class="home-main-element">
            <div class="sub-element">
                <div style={{opacity: opacity(), display: (opacity() === 0? "none": "block")}}>
                    <TypingText text="Want to know more about a subreddit?" startWithLine={true} startAfter={0} finishAfter={2}/>
                    <TypingText text="We got everything you need!" startWithLine={true} startAfter={2} finishAfter={-1}/>
                </div>
                <div style={{"margin-top": paddingTop() + "px", "margin-bottom": paddingBottom() + "px"}}>
                    <MainForm/>
                </div>
                {
                    data() === undefined?
                        (showSpinner()? <Spin/>: <></>):
                        <div class="center card-div">
                            <CircleBar title="Toxicity" max={100} value={data().score}/>
                            <CircleBar title="Innacuracy" max={100} value={37}/>
                            <div class="center col-3" style={{display: "inline-block"}}>
                                <p class="circle-bar-title">Posts Analyzed</p>
                                <p class="circle-bar-title">{data().records_analyzed}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

const HomePage: Component = () => {
    return (
        <>
            <NavMenu/>
            <MainPage/>
        </>
    );
}

export default HomePage;
