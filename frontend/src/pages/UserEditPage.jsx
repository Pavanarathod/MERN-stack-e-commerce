import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer/FormContainer";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { getUseDetailAction } from "../core/actions/authActions/userAction";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UserEditPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useSelector((state) => state.userDetail);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUseDetailAction(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user.name, user._id, id, dispatch, user.isAdmin, user.email]);

  const registerSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light py-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          error && <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Register
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
