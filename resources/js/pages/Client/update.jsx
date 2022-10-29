import React, { useState, useEffect, useContext, useRef } from "react";
import {
    Col,
    Button,
    Row,
    Container,
    Card,
    Form,
    Spinner,
    Image,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { GlobalContext } from "../../context/Provider";
import {
    updateClientAction,
    getClientDetailAction,
} from "../../context/actions";

const UpdateClient = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const { clientsState, clientsDispatch } = useContext(GlobalContext);
    const clientDetailLoading = clientsState.detail.loading;
    const clientDetail = clientsState.detail.data;

    const updateClientLoading = clientsState.updateClient.loading;

    useEffect(() => {
        getClientDetailAction(navigate, params.id)(clientsDispatch);
    }, []);

    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),

        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        // image: Yup.mixed().required("Image is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: clientDetail ? clientDetail.name : "",
            email: clientDetail ? clientDetail.email : "",
            image: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            let formData = new FormData();
            Object.keys(values).map((key) => {
                if (values[key] != "") {
                    formData.set(key, values[key]);
                }
                formData.set("_method", "PUT");
            });
            updateClientAction(navigate, params.id, formData)(clientsDispatch);
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
                                        Update Client
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
                                            {clientDetail && !values["image"] && (
                                                <a
                                                    className="d-flex align align-items-center mt-4 mb-4"
                                                    target="_blank"
                                                    href={
                                                        clientDetail.image_url
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            clientDetail.image_url
                                                        }
                                                        roundedCircle
                                                        height="40"
                                                        width="40"
                                                    />
                                                    <p className="mb-1">
                                                        {clientDetail.image}
                                                    </p>
                                                </a>
                                            )}

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
                                                            updateClientLoading
                                                        }
                                                    >
                                                        {updateClientLoading ? (
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
                                                            "Update"
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

export default UpdateClient;
