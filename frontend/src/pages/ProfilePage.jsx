// @ts-nocheck
import { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import {
  getUseDetailAction,
  updateUserProfile,
} from "../core/actions/authActions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserOrdersAction } from "../core/actions/orderActions/orderActions";

const ProfilePage = () => {
  const { user, loading, error } = useSelector((state) => state.userDetail);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdate);
  const {
    userOrders,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.userOrders);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUseDetailAction("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user.email, user.name]);

  useEffect(() => {
    dispatch(getUserOrdersAction());
  }, [dispatch]);

  const updateUserData = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password is incorrect please check the password.");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  console.log(user);

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Profile Updated.</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Row>
        <Col md={3}>
          <h2>User Profile.</h2>
          <Form onSubmit={updateUserData}>
            <Form.Group controlId="text">
              <Form.Label>Enter You'r Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          {orderLoading ? (
            <Loader />
          ) : orderError ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {userOrders?.length === 0 ? (
                <h1>You have no orders?</h1>
              ) : (
                <>
                  <h2>My Orders</h2>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERD</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders?.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>$ {order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <p style={{ color: "red" }}>Not Paid</p>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <p style={{ color: "red" }}>not delivered</p>
                            )}
                          </td>
                          <td>
                            <Link to={`/orders/${order._id}`}>
                              <Button variant="light">Details</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
