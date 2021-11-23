import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../components/FormContainer/FormContainer";
import Message from "../components/Message/Message";
import { saveShippingAddress } from "../core/actions/cartAction/cartAction";

const PlaceorderPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.shippingAddress);
  const { paymentDetail } = useSelector((state) => state.paymentDetails);
  const navigate = useNavigate();

  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 100;

  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

  const total = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const goToProduct = (url) => {
    navigate(`/products/${url}`);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentDetail.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>You'r cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems?.map((item, index) => (
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
                            <strong onClick={() => goToProduct(item.product)}>
                              {item.name}
                            </strong>
                          </p>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.qty * item.price}
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${total}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
              >
                Placeorder
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderPage;
