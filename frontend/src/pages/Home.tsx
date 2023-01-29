import { Component, createSignal } from "solid-js";
import NavMenu from "../components/NavManu";
import { Button, Col, Form, Image, InputGroup, Row } from "solid-bootstrap";
import SearchIcon from '@suid/icons-material/Search';
import "./styles/Home.scss";
import CircleBar from "../components/CircleBar";

const MainForm: Component = () => {
    const [validated, setValidated] = createSignal(false);
    const [redditSublink, setRedditSublink] = createSignal("");

    /** Called when the user clicks on the submit button. */
    const handleSubmit = (event: SubmitEvent) => {
        // Get and validate form
        const form = event.currentTarget as HTMLFormElement;
        event.preventDefault();
        setValidated(true);

        // If not valid yet
        if (!(form.checkValidity())) {
            event.stopPropagation();
            return;
        }
    };

    return (
        <Form noValidate validated={validated()} onSubmit={handleSubmit} class="reddit-subreddit-search-bar">
            <Row>
                <Col>
                    <InputGroup class="mb-3" hasValidation>
                        <InputGroup.Text id="reddit-subredditlink-addon"><Image class="reddit-logo" src="/reddit-logo.png" alt="reddit.com"/>&nbsp;&nbsp;r/</InputGroup.Text>
                        <Form.Control type="text" required placeholder="Subreddit" value={redditSublink()} onInput={e => setRedditSublink(e.currentTarget.value)} aria-label="Subreddit" aria-describedby="reddit-subredditlink-addon"/>
                        <Button type="submit"><SearchIcon/></Button>
                        <Form.Control.Feedback type="invalid">
                            Please enter a subreddit name.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )
}

const HomePage: Component = () => {
    return (
        <>
            <NavMenu/>
            <br/>
            <MainForm/>
            <br/>
            <div class="center">
                <CircleBar title="Toxicity" value={80}/>
                <CircleBar title="Misinformation" value={23}/>
                <CircleBar title="Duplicate Data" value={57}/>
            </div>
        </>
    );
}

export default HomePage;
