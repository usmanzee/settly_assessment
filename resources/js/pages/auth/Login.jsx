import React, { useState, useContext, useRef } from "react";
import {
    Col,
    Button,
    Row,
    Container,
    Card,
    Form,
    Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { GlobalContext } from "../../context/Provider";

import { loginAction } from "../../context/actions";

const Login = (props) => {
    const { authState, authDispatch } = useContext(GlobalContext);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            loginAction(values)(authDispatch);
        },
    });

    const { values, errors, getFieldProps, handleSubmit } = formik;

    return (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={4} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-2">
                                    <h3 className="fw-bold mb-2 text-uppercase text-center">
                                        Settly
                                    </h3>
                                    <p className="mb-3 text-center">
                                        Please enter your email and password
                                    </p>
                                    <div className="mb-3">
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicEmail"
                                            >
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="Enter email"
                                                    {...getFieldProps("email")}
                                                    isInvalid={!!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Password"
                                                    isInvalid={
                                                        !!errors.password
                                                    }
                                                    {...getFieldProps(
                                                        "password"
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    disabled={authState.loading}
                                                >
                                                    {authState.loading ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="grow"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />{" "}
                                                            Loading...
                                                        </>
                                                    ) : (
                                                        "Login"
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0 text-center">
                                                Don't have an account?{" "}
                                                <Link
                                                    to="/register"
                                                    className="text-primary fw-bold"
                                                >
                                                    Register
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
