// @ts-nocheck
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProdcutDetail,
  getProductReviewActions,
} from "../core/actions/productActions/productAction";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { productReviewsActions } from "../core/reducers/productReducer/productReviewsSlice";
import { Helmet } from "react-helmet";
import ReactHelmet from "../components/ReactHelmet/ReactHelmet";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);

  const { products, loading, error } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    productReviews,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.productReviews);

  useEffect(() => {
    if (productReviews) {
      setRating(0);
      setComment("");
      dispatch(productReviewsActions.setReset());
    }
    dispatch(getProdcutDetail(id));
  }, [id, dispatch, productReviews]);

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addReviewToCart = (e) => {
    e.preventDefault();
    dispatch(
      getProductReviewActions(id, {
        rating,
        comment,
      })
    );
  };

  const allreadyReviewd = products.reviews?.find(
    (rev) => rev.user.toString() === userInfo._id.toString()
  );

  return (
    <>
      <ReactHelmet titleName={products?.name} />
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
                  {products.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(products.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      disabled={products?.countInStock === 0}
                      className="btn-block"
                      type="button"
                      onClick={addToCart}
                    >
                      Add To Cart
                      <i className="fas fa-shopping-cart mx-2"></i>
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className="mt-3">Reviews</h2>
              {products.reviews?.length === 0 && <Message>No reviews</Message>}
              {userInfo && (
                <ListGroup variant="flush">
                  {products.reviews?.map((review) => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>
                    <h2>Write a Customer Review</h2>
                    {reviewLoading && <Loader />}
                    {reviewError && (
                      <Message variant="danger">{reviewError}</Message>
                    )}
                    {userInfo ? (
                      <>
                        {!allreadyReviewd ? (
                          <Form onSubmit={addReviewToCart}>
                            <FormGroup controlId="rating">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                              </Form.Control>
                            </FormGroup>
                            <FormGroup controlId="comment">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as="textarea"
                                row={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                            </FormGroup>
                            <Button
                              className="mt-2 px-5"
                              type="submit"
                              variant="primary"
                            >
                              Add Review
                            </Button>
                          </Form>
                        ) : (
                          <h2>You reviewd this product</h2>
                        )}
                      </>
                    ) : (
                      <Message>
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          To write a review please login
                        </Link>
                      </Message>
                    )}
                  </ListGroupItem>
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
