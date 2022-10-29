import React from "react";
import { Container } from "react-bootstrap";
import { Header } from ".";
import { Outlet } from "react-router-dom";

export const Layout = (props) => {
    const { children } = props;
    return (
        <div>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};
