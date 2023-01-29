import { Component, createSignal } from "solid-js";
import NavMenu from "../components/NavManu";
import { Button, Col, Form, FormControl, InputGroup, Row } from "solid-bootstrap";
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
                    <InputGroup class="mb-3" hasValidation>
                        <InputGroup.Text id="reddit-subredditlink-addon">reddit.com/r/</InputGroup.Text>
                        <Form.Control type="text" required placeholder="Subreddit" aria-label="Subreddit" aria-describedby="reddit-subredditlink-addon"/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a subreddit link.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col class="submit-btn">
                    <Button type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}

const HomePage: Component = () => {
    return (
        <>
            <NavMenu/>
            <MainForm/>
            <p>Main page</p>
        </>
    );
}

export default HomePage;
