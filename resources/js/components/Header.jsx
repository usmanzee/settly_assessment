import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { logoutAction } from "../context/actions";
import { GlobalContext } from "../context/Provider";

export const Header = (props) => {
    const { profileDispatch, clientsDispatch } = useContext(GlobalContext);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Settly</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={RouterLink} to="/">
                            Home
                        </Nav.Link>
                    </Nav>
                    <NavDropdown
                        title={
                            <div
                                style={{
                                    height: "32px",
                                    width: "32px",
                                    backgroundColor: "#c5c5c5",
                                }}
                                className="rounded-circle"
                            ></div>
                        }
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item
                            onClick={() => {
                                logoutAction()(
                                    profileDispatch,
                                    clientsDispatch
                                );
                            }}
                        >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
