import { useColorMode } from "@hope-ui/solid";
import { Container, Nav, Navbar } from "solid-bootstrap";
import type { Component } from "solid-js";
import ThemeSwitcher from "./ThemeSwitcher";

const NavMenu: Component = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Navbar bg={colorMode()} variant={(colorMode() === "light"? "light": "dark")} style={{
            "border-bottom": "1px solid " + (colorMode() === "light"? "black": "white")
        }}>
            <Container>
                <Navbar.Brand>RedditSafe</Navbar.Brand>
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
