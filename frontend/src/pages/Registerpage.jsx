import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer/FormContainer";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { newUserRegister } from "../core/actions/authActions/userAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = () => {
  const { userInfo, loading, error } = useSelector(
    (state) => state.userRegister
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(newUserRegister(name, email, password));
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={registerSubmitHandler}>
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
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterPage;
