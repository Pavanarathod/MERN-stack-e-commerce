import products from "../utils/products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";

const Homepage = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;
