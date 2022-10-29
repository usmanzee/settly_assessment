import React, { useState, useEffect, useContext } from "react";
import {
    Col,
    Container,
    Row,
    Card,
    Table,
    Button,
    Modal,
    Spinner,
    Image,
} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Link, useNavigate } from "react-router-dom";

import { GlobalContext } from "../../context/Provider";
import { getClientsAction, deleteClientAction } from "../../context/actions";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

import _ from "lodash";

const Home = (props) => {
    const navigate = useNavigate();
    const [tablePage, setTablePage] = useState(0);
    const [tableRowsPerPage, setTableRowsPerPage] = useState(10);
    const [pages, setPages] = useState([]);
    const [deleteModalshow, setDeleteModalShow] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const { profileState, clientsState, clientsDispatch } =
        useContext(GlobalContext);

    const profile = profileState.data;
    const clientsLoading = clientsState.loading;
    // const clients = clientsState.list;

    const deleteLoading = clientsState.deleteClient.loading;

    useEffect(() => {
        getClientsAction()(clientsDispatch);
    }, []);

    useEffect(() => {
        if (clientsState.list && clientsState.list.length) {
            const pageCount = Math.ceil(
                clientsState.list.length / tableRowsPerPage
            );
            const pgs = _.range(0, pageCount);
            setPages(pgs);
        }
    }, [clientsState.list]);

    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = (client) => {
        setDeleteModalShow(true);
        setSelectedClient(client);
    };

    const handleDeleteClient = () => {
        deleteClientAction(navigate, selectedClient.id)(clientsDispatch);
        setDeleteModalShow(false);
    };

    return (
        <>
            <Container>
                <div className="pagetitle">
                    <h1>
                        Hi{" "}
                        <strong>
                            {" "}
                            <em>{profile && profile.name}</em>
                        </strong>{" "}
                        welcome to your admin account
                    </h1>
                </div>
                <Row>
                    <Col md={12}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    Clients List
                                    <Link to="/client/add">
                                        <Button variant="primary">
                                            Add New Client
                                        </Button>
                                    </Link>
                                </Card.Title>

                                <LoadingOverlay
                                    active={deleteLoading || clientsLoading}
                                    spinner
                                    text="Loading, please wait..."
                                >
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clientsState.list.length > 0 ? (
                                                clientsState.list
                                                    .slice(
                                                        tablePage *
                                                            tableRowsPerPage,
                                                        tablePage *
                                                            tableRowsPerPage +
                                                            tableRowsPerPage
                                                    )
                                                    .map((client, index) => {
                                                        return (
                                                            <tr key={client.id}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    <Image
                                                                        src={
                                                                            client.image_url
                                                                        }
                                                                        roundedCircle
                                                                        height="40"
                                                                        width="40"
                                                                    />{" "}
                                                                    {
                                                                        client.name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        client.email
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleDeleteModalShow(
                                                                                client
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                    {"  "}
                                                                    <Link
                                                                        to={`/client/update/${client.id}`}
                                                                    >
                                                                        <Button
                                                                            variant="outline-primary"
                                                                            size="sm"
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                            ) : (
                                                <tr className="table-center-data">
                                                    <td
                                                        colSpan={4}
                                                        style={{
                                                            border: "none",
                                                            boxShadow: "none",
                                                        }}
                                                    >
                                                        <h5>No client found</h5>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </LoadingOverlay>

                                <Pagination className="justify-content-end">
                                    {pages.map((page, index) => {
                                        return (
                                            <Pagination.Item
                                                key={index}
                                                active={tablePage == page}
                                                onClick={() => {
                                                    setTablePage(page);
                                                }}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        );
                                    })}
                                </Pagination>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                size="md"
                show={deleteModalshow}
                centered
                backdrop="static"
                keyboard={false}
                animation={false}
                onHide={handleDeleteModalClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this client?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleDeleteModalClose}
                    >
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleDeleteClient()}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Home;
