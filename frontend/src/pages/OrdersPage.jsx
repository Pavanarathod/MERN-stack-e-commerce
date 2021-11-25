// @ts-nocheck
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getOrdersAction,
  orderPayAction,
} from "../core/actions/orderActions/orderActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { orderPayActions } from "../core/reducers/orderReducer/orderPaySlice";

const OrdersPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderDetails
  );

  const { success: paySuccess, loading: payLoading } = useSelector(
    (state) => state.orderPay
  );

  useEffect(() => {
    if (!orderDetails.orderDetails || paySuccess) {
      dispatch(orderPayActions.setReset());
      dispatch(getOrdersAction(orderId));
    }
  }, [orderId, dispatch, orderDetails.orderDetails, paySuccess]);

  const goToProduct = (url) => {
    navigate(`/products/${url}`);
  };

  const payOrder = () => {
    dispatch(
      orderPayAction(orderId, {
        id: "somerandomid",
        status: "paymentcomplete",
        update_time: "sometimeing",
        email_address: "pavan@gmail.com",
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <h1>Order: {orderDetails._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <strong>Name: </strong>
                  {orderDetails.user?.name}
                  <div>
                    <strong>Email: </strong>
                    <a href={`mailto:${orderDetails.user?.email}`}>
                      {orderDetails.user?.email}
                    </a>
                  </div>
                  <p>
                    <strong>Address: </strong>
                    {orderDetails.shippingAddress?.address},{" "}
                    {orderDetails.shippingAddress?.city},{" "}
                    {orderDetails.shippingAddress?.postalCode},{" "}
                    {orderDetails.shippingAddress?.country}
                  </p>
                  {orderDetails.isDeliverd ? (
                    <Message variant="success">
                      Deliverd on {orderDetails.paidOn}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Deliverd</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {orderDetails.paymentMethod}
                  </p>
                  {orderDetails.isPaid ? (
                    <Message variant="success">
                      Paid on {orderDetails.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {orderDetails?.orderItems?.length === 0 ? (
                    <Message>Order is empty cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {orderDetails?.orderItems?.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <p>
                                <strong
                                  onClick={() => goToProduct(item.product)}
                                >
                                  {item.name}
                                </strong>
                              </p>
                            </Col>
                            <Col md={4}>
                              {item.qty} X ${item.price} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>Order Summary</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Items</Col>
                      <Col>${orderDetails.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${orderDetails.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderDetails.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total</Col>
                      <Col>${orderDetails.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>

                {!orderDetails.isPaid && (
                  <>
                    {payLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <Button
                          className="btn-block btn-primary my-2"
                          onClick={payOrder}
                        >
                          Pay order
                        </Button>
                        <PayPalButton
                          amount={orderDetails.totalPrice}
                          onSuccess={payOrder}
                        />
                      </>
                    )}
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrdersPage;
