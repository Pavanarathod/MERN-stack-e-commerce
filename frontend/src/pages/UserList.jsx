import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  usersListAction,
} from "../core/actions/authActions/userAction";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, loading, error } = useSelector((state) => state.userLists);
  const {
    userDeleteSuccess,
    loading: deleteLoading,
    error: errorLoading,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(usersListAction());
  }, [dispatch, userDeleteSuccess]);

  const deleteUser = (userId) => {
    dispatch(deleteUserAction(userId));
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                </td>
                <td>
                  {user.isAdmin ? (
                    <p style={{ color: "green" }}>Admin</p>
                  ) : (
                    <p style={{ color: "red" }}>User</p>
                  )}
                </td>
                <td>
                  <Link to={`/users/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button onClick={() => deleteUser(user._id)} variant="danger">
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
