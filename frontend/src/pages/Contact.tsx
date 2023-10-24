import { useColorMode } from "@hope-ui/solid";
import { Button, Col, FloatingLabel, Form, Row } from "solid-bootstrap";
import { Component } from "solid-js";
import NavMenu from "../components/NavManu";
import "./styles/Contact.scss";


const Contact: Component = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <NavMenu/>
                <div class="contact-me-form-wrapper">
                    <Form class="contact-me-form">
                        <Row>
                            <Col><h1 class="contact-title center">Get in Touch!</h1></Col>
                        </Row>
                        <Row>
                            <Col><h1 class="contact-title">&nbsp;</h1></Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="First Name" class="mb-3">
                                    <Form.Control type="text" placeholder="First Name" style={colorMode() === "dark"? {"background-color": "#212529", color: "white"}: ""}/>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Last Name" class="mb-3">
                                    <Form.Control type="text" placeholder="Last Name" style={colorMode() === "dark"? {"background-color": "#212529", color: "white"}: ""}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Email address" class="mb-3">
                                    <Form.Control type="email" placeholder="Email address" style={colorMode() === "dark"? {"background-color": "#212529", color: "white"}: ""}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel class="mb-3" controlId="floatingInput" label="Message">
                                    <Form.Control as="textarea" type="text" placeholder="Message" style={colorMode() === "dark"? {"background-color": "#212529", color: "white", height: "200px", resize: "none"}: {height: "200px", resize: "none"}}/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <div class="center">
                            <Button class="center" type="submit">Submit</Button>
                        </div>
                    </Form>
            </div>
        </>
    );
}

export default Contact;
