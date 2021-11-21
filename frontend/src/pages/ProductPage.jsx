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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProdcutDetail } from "../core/actions/productActions/productAction";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProdcutDetail(id));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            <i className="fas fa-chevron-left mx-2"></i>
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={products?.image} alt={products?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{products?.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={products?.rating}
                    text={`${products?.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${products?.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {products?.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{products?.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {products?.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      disabled={products?.countInStock === 0}
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
      )}
    </>
  );
};

export default ProductPage;
