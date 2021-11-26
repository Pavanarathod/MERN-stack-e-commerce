import axios from "axios";
import { productDeleteActions } from "../../reducers/productReducer/productDeleteSlice";
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

const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch(productDeleteActions.setProducts());
  } catch (error) {
    dispatch(
      productDeleteActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export { getAllProducts, getProdcutDetail, deleteProductAction };
