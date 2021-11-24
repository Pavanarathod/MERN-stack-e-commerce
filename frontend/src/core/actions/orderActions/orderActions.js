import axios from "axios";
import { orderDetailActions } from "../../reducers/orderReducer/orderDetailSlice";
import { orderActions } from "../../reducers/orderReducer/orderSlice";

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch(orderActions.setOrders(data));
  } catch (error) {
    dispatch(
      orderActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getOrdersAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch(orderDetailActions.setOrdersDetail(data));
  } catch (error) {
    dispatch(
      orderDetailActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
