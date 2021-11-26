import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer/FormContainer";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import {
  getUseDetailAction,
  updateDetailUser,
} from "../core/actions/authActions/userAction";
import { userDetailUpdateSliceActions } from "../core/reducers/authReducer/userDetailUpdateSlice";

const UserEditPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useSelector((state) => state.userDetail);
  const {
    userDetailUpdateSuccess,
    loading: udateLoading,
    error: updateError,
  } = useSelector((state) => state.userDetailUpdate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailUpdateSuccess) {
      dispatch(userDetailUpdateSliceActions.onReset());
      navigate("/admin/userlist");
    }
    if (!user.name || user._id !== id) {
      dispatch(getUseDetailAction(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [
    user.name,
    user._id,
    id,
    dispatch,
    user.isAdmin,
    user.email,
    userDetailUpdateSuccess,
    navigate,
  ]);

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDetailUser({
        _id: user._id,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light py-3">
        Go Back
      </Link>
      {udateLoading && <Loader />}
      {updateError && <Message variant="danger">{updateError}</Message>}

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
