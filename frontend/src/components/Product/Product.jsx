import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div" onClick={goToProduct}>
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
