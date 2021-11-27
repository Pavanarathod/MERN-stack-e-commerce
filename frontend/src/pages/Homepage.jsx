// import products from "../utils/products";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product/Product";
import { getAllProducts } from "../core/actions/productActions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate/Paginate";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

import ReactHelmet from "../components/ReactHelmet/ReactHelmet";

const Homepage = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <ReactHelmet titleName="Welcome to proshop | Home" />
      {!keyword && <ProductCarousel />}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.product?.map((product) => (
              <Col key={product._id} sm={12} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={products?.pages}
            page={products?.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Homepage;
