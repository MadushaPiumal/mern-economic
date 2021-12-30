import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCentres } from "../actions/centreActions";
import {
  register,
  getUserDetails,
  deleteUser,
  listUsers,
} from "../actions/userActions";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [centreName, setCentreName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const centreList = useSelector((state) => state.centreList);
  const { centres } = centreList;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  
  const userRegister = useSelector((state) => state.userRegister);
  const { loading: regLoading, error: regError } = userRegister;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else if (name === "") {
      setMessage("Name Is Empty");
    } else if (centreName === "") {
      setMessage("Centre Is Empty");
    } else if (email === "") {
      setMessage("Email Is Empty");
    } else {
      // console.log(centreName);

      dispatch(register(name, email, centreName, password));
    }
  };

  const updateHandler = (id) => {
    dispatch(getUserDetails(id));
  };

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listUsers());
      dispatch(listCentres());
    }
  }, [history, userInfo, dispatch, successDelete]);
  return (
    <Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Col md={6}>
        <h2>New User</h2>

        {regError && <Message variant="danger">{regError}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="centre">
            <Form.Label>Centre</Form.Label>
            <Form.Control
              as="select"
              value={centreName}
              onChange={(e) => setCentreName(e.target.value)}
            >
              {centres.map((centre) => (
                <option value={centre._id}>{centre.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {regLoading && <Loader />}

          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Users</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <Table strriped="true" bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CENTRE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
                 {users && users.map((user,centre) => (<tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{centre}</td>
                  <td>
                    <LinkContainer to={`user/${user._id}/edit`}>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={(e) => updateHandler(user._id)}
                      >
                        Update
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(user._id)}
                    >
                      Delete
                    </Button>
                  </td></tr>))}
              {/* {users.map(({user,centre}) =>
                (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{centre.name}</td>
                  <td>
                    <LinkContainer to={`user/${user._id}/edit`}>
                      <Button
                        variant="success"
                        className="btn-sm"
                        onClick={(e) => updateHandler(user._id)}
                      >
                        Update
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserScreen;
