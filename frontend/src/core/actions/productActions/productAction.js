import axios from "axios";
import { productDetailActions } from "../../reducers/productReducer/productDetailSlice";
import { productActions } from "../../reducers/productReducer/productSlice";

const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(productActions.setLoading());

    const { data } = await axios.get("/api/products");
    dispatch(productActions.setProducts(data));
  } catch (error) {
    dispatch(
      productActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

const getProdcutDetail = (id) => async (dispatch) => {
  try {
    dispatch(productDetailActions.setLoading());

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailActions.setProducts(data));
  } catch (error) {
    dispatch(
      productDetailActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export { getAllProducts, getProdcutDetail };
