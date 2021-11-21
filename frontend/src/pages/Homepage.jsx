// import products from "../utils/products";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";
import { getAllProducts } from "../core/actions/productActions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";

const Homepage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homepage;
