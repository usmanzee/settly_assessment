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

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { GlobalContext } from "../../context/Provider";
import { addClientAction } from "../../context/actions";

const AddClient = (props) => {
    const navigate = useNavigate();
    const { clientsState, clientsDispatch } = useContext(GlobalContext);
    const addClientLoading = clientsState.addClient.loading;

    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),

        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        image: Yup.mixed().required("Image is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            image: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            let formData = new FormData();
            Object.keys(values).map((k) => {
                formData.set(k, values[k]);
            });
            addClientAction(navigate, formData)(clientsDispatch);
        },
    });

    const { values, errors, getFieldProps, handleSubmit } = formik;

    return (
        <>
            <Container>
                <Card className="mt-4 mb-4">
                    <Card.Body>
                        <Row className="justify-content-center align-items-center">
                            <Col md={4} xs={12}>
                                <div className="mb-4 mt-4">
                                    <h3 className="fw-bold mb-4 text-uppercase ">
                                        Add New Client
                                    </h3>
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
                                                controlId="formImage"
                                            >
                                                <Form.Label className="text-center">
                                                    Profile Image
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="file"
                                                    placeholder="Select Image"
                                                    // {...getFieldProps("image")}
                                                    isInvalid={!!errors.image}
                                                    onChange={(e) => {
                                                        formik.setFieldValue(
                                                            "image",
                                                            e.target.files[0]
                                                        );
                                                    }}
                                                    accept="image/*"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.image}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Row className="d-grid d-flex">
                                                <Col md={6}>
                                                    <Button
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        variant="danger"
                                                        onClick={() =>
                                                            navigate("/")
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Col>
                                                <Col md={6}>
                                                    <Button
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={
                                                            addClientLoading
                                                        }
                                                    >
                                                        {addClientLoading ? (
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
                                                            "Add"
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AddClient;
