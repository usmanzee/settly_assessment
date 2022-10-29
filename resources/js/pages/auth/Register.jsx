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
import ReCAPTCHA from "react-google-recaptcha";
import { registerAction } from "../../context/actions";

import { GlobalContext } from "../../context/Provider";

const Register = (props) => {
    const { authState, authDispatch } = useContext(GlobalContext);
    const captchaRef = useRef(null);

    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirm_password: Yup.string()
            .required("Confirm Password is required")
            .oneOf(
                [Yup.ref("password"), null],
                "Password & Confirm Password does not match"
            ),
        recaptcha: Yup.string().required("Captcha is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            recaptcha: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values);
            registerAction(values)(authDispatch);
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
                                    <h2 className="fw-bold mb-2 text-uppercase text-center">
                                        Settly
                                    </h2>
                                    <p className="mb-3 text-center">
                                        Create your account
                                    </p>
                                    <div className="mb-3">
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formName"
                                            >
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="name"
                                                    placeholder="Enter name"
                                                    {...getFieldProps("name")}
                                                    isInvalid={!!errors.name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formEmail"
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
                                                controlId="formPassword"
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
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formConfirmPassword"
                                            >
                                                <Form.Label>
                                                    Confirm Password
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    isInvalid={
                                                        !!errors.confirm_password
                                                    }
                                                    {...getFieldProps(
                                                        "confirm_password"
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirm_password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formReCAPTCHA"
                                            >
                                                <ReCAPTCHA
                                                    ref={captchaRef}
                                                    sitekey="6LdUNyYTAAAAALO0EIsGr2sf0nZVEQ72NZCfWWiN"
                                                    onChange={(value) => {
                                                        if (value) {
                                                            values.recaptcha =
                                                                value;
                                                        }
                                                    }}
                                                />
                                                <Form.Control.Feedback
                                                    type="invalid"
                                                    style={{
                                                        display:
                                                            errors.recaptcha
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
                                                    {errors.recaptcha}
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
                                                        "Create Account"
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-primary fw-bold"
                                                >
                                                    Login
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

export default Register;
