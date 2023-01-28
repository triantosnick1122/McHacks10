import { Container, Nav, Navbar } from "solid-bootstrap";
import type { Component } from "solid-js";
import ThemeSwitcher from "./ThemeSwitcher";

const NavMenu: Component = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">RedditSafe</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav class="me-auto">
                            <Nav.Link href="/">Thread Info</Nav.Link>
                            <Nav.Link href="/">Leaderboard</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <ThemeSwitcher/>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
