import { Component, createSignal } from "solid-js";
import NavMenu from "../components/NavManu";
import { Button, Col, Form, Image, InputGroup, Row } from "solid-bootstrap";
import SearchOutlinedIcon from '@suid/icons-material/SearchOutlined';
import "./styles/Home.scss";

const MainForm: Component = () => {
    const [validated, setValidated] = createSignal(false);

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
                    <InputGroup hasValidation>
                        <InputGroup.Text id="reddit-subredditlink-addon"><Image class="reddit-logo" src="src/assets/reddit-logo.png" alt="reddit.com"/>&nbsp;&nbsp;r/</InputGroup.Text>
                        <Form.Control type="text" required placeholder="Subreddit" aria-label="Subreddit" aria-describedby="reddit-subredditlink-addon"/>
                        <Button type="submit"><SearchOutlinedIcon/></Button>
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
        </>
    );
}

export default HomePage;
