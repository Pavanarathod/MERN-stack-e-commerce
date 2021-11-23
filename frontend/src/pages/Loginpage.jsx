import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer/FormContainer";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { login } from "../core/actions/authActions/userAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loginpage = () => {
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(redirect);
  console.log(location);

  useEffect(() => {
    if (userInfo) {
      if (redirect === "shipping") {
        navigate("/shipping");
      } else {
        navigate(redirect);
      }
    }
  }, [userInfo, navigate, redirect]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={loginSubmitHandler}>
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
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Loginpage;
