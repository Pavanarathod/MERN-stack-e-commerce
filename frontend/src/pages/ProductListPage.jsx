import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  usersListAction,
} from "../core/actions/authActions/userAction";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProductAction,
  getAllProducts,
} from "../core/actions/productActions/productAction";

const ProductListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    productDeleteSuccess,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [userInfo, dispatch, navigate, productDeleteSuccess]);

  const deleteHandler = (productId) => {
    dispatch(deleteProductAction(productId));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Product</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3">
            Create Product <i className="fas fa-plus"></i>{" "}
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

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
              <th>Price</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td> ${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteHandler(product._id)}
                    variant="danger"
                  >
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

export default ProductListPage;
