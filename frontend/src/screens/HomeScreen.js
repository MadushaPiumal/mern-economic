import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listCentres,
  getCertreDetails,
  centreRegister,
  deleteCentre,
} from "../actions/centreActions";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const [centreName, setCentreName] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const centreList = useSelector((state) => state.centreList);
  const { loading, error, centres } = centreList;
  
 
  const centreDelete = useSelector((state) => state.centreDelete);
  const { success: successDelete } = centreDelete;

  const submitHandler = (e) => {
    if (centreName === "") {
      setMessage("Centre Name Is Empty");
    } else {
      dispatch(centreRegister(centreName));
    }
  };

  const updateHandler = (id) => {
    dispatch(getCertreDetails(id));
  };

  const deleteHandler = (id) => {
    dispatch(deleteCentre(id));
  };

  useEffect(() => {
    dispatch(listCentres());
  }, [dispatch, successDelete]);
  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Col md={6}>
        <h2>Create Centers</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Centre Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Centre Name"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Save Centre
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Centres</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <Table strriped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {centres.map((centre) => (
                <tr key={centre._id}>
                  <td>{centre._id}</td>
                  <td>{centre.name}</td>
                  <td>
                    <LinkContainer to={`centre/${centre._id}/edit`}>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={(e) => updateHandler(centre._id)}
                      >
                        Update
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(centre._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default HomeScreen;
