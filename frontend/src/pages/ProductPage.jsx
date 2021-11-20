import { Link, useParams } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating/Rating";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  // const product = products.find((p) => p._id === id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data);
    };
    getSingleProduct();
  }, [id]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        <i className="fas fa-chevron-left mx-2"></i>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product?.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product?.price}</ListGroupItem>
            <ListGroupItem>Description: {product?.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>{product?.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  disabled={product?.countInStock === 0}
                  className="btn-block"
                  type="button"
                >
                  Add To Cart
                  <i className="fas fa-shopping-cart mx-2"></i>
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
