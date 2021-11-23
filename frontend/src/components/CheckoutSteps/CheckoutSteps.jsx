import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const navigate = useNavigate();

  const gotoSomething = (url) => {
    navigate(url);
  };

  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link onClick={() => gotoSomething("/login")}>Sign in</Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link onClick={() => gotoSomething("/shipping")}>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link onClick={() => gotoSomething("/payment")}>Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link onClick={() => gotoSomething("/placeorder")}>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
