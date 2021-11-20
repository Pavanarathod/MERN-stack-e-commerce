// import products from "../utils/products";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";
import axios from "axios";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    getProducts();
  }, []);

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
