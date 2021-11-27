import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { getToppProductsAction } from "../../core/actions/productActions/productAction";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { topProducts, loading, error } = useSelector(
    (state) => state.productsTop
  );

  useEffect(() => {
    dispatch(getToppProductsAction());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts?.map((pro) => (
        <Carousel.Item key={pro._id}>
          <Link to={`/products/${pro._id}`}>
            <Image src={pro.image} alt={pro.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {pro.name} ({pro.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
