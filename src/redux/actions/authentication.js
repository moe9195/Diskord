import decode from "jwt-decode";
import instance from "./instance";
import { SET_ERRORS, SET_CURRENT_USER, SET_CHANNELS } from "./actionTypes";
import { fetchChannels } from "./channels";

export const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    instance.defaults.headers.Authorization = `jwt ${token}`;
  } else {
    delete instance.defaults.headers.Authorization;
    localStorage.removeItem("token");
  }
};

export const setCurrentUser = token => {
  setAuthToken(token);
  let user = null;
  if (token) {
    user = decode(token);
  }
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const login = userData => async dispatch => {
  try {
    const res = await instance.post("/login/", userData);
    const { token } = res.data;
    dispatch(setCurrentUser(token));
    dispatch(fetchChannels());
  } catch (error) {
    console.error(error);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const signup = userData => async dispatch => {
  try {
    const res = await instance.post("/signup/", userData);
    const { token } = res.data;
    dispatch(setCurrentUser(token));
    dispatch(fetchChannels());
  } catch (error) {
    console.error(error);
    console.log(error.response.data);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => {
  return setCurrentUser();
};

export const checkForExpiredToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = decode(token);
    if (1000 * user.exp >= Date.now()) {
      return setCurrentUser(token);
    }
  }
  return setCurrentUser();
};
