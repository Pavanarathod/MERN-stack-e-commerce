import axios from "axios";
import { loginAciton } from "../../reducers/authReducer/loginSlice";
import { registerActions } from "../../reducers/authReducer/registerSlice";
import { userDeleteAction } from "../../reducers/authReducer/userDeleteSlice";
import { userDetailActions } from "../../reducers/authReducer/userDetailSlice";
import { userDetailUpdateSliceActions } from "../../reducers/authReducer/userDetailUpdateSlice";
import { userListActions } from "../../reducers/authReducer/userListSlice";
import { userUpdateActions } from "../../reducers/authReducer/userUpdateSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginAciton.setLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch(loginAciton.setUser(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginAciton.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(loginAciton.setLogout());
};

export const newUserRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerActions.setLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch(registerActions.setUser(data));
    dispatch(loginAciton.setUser(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      registerActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getUseDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailActions.setLoading());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch(userDetailActions.setUser(data));
  } catch (error) {
    dispatch(
      userDetailActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch(userUpdateActions.setUser(data));
  } catch (error) {
    dispatch(
      userUpdateActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const usersListAction = () => async (dispatch, getState) => {
  try {
    dispatch(userListActions.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);
    dispatch(userListActions.setUserLists(data));
  } catch (error) {
    dispatch(
      userListActions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const deleteUserAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteAction.setLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${userId}`, config);
    dispatch(userDeleteAction.setSuccess());
  } catch (error) {
    dispatch(
      userDeleteAction.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateDetailUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userDetailUpdateSliceActions.onLoding());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(userDetailUpdateSliceActions.onSuccess());
    dispatch(userDetailActions.setUser(data));
  } catch (error) {
    dispatch(
      userDetailUpdateSliceActions.onError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
