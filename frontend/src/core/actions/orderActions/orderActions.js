import axios from "axios";
import { userOrderActions } from "../../reducers/authReducer/userOrdersSlice";
import { orderDetailActions } from "../../reducers/orderReducer/orderDetailSlice";
import { orderPayActions } from "../../reducers/orderReducer/orderPaySlice";
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

export const orderPayAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayActions.setLoading());

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch(orderPayActions.setOrder(data));
    } catch (error) {
      dispatch(
        orderPayActions.setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const getUserOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch(userOrderActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/myorders", config);

    dispatch(userOrderActions.setUserOrders(data));
  } catch (error) {
    dispatch(
      userOrderActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
