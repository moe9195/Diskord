import decode from "jwt-decode";
import instance from "./instance";
import { SET_ERRORS, SET_CURRENT_USER } from "./actionTypes";

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
  const user = token ? decode(token) : null;
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

/*
 *
 * You can combine the login() and signup() actions into
 * a single action that receives a type.
 * This way you can simplify a lot of the code and remove
 * some unnecessary logic.
 *
 * This would also simplify your code elsewhere a little.
 * See RegistrationForm.js for more.
 *
 */

export const login = userData => async dispatch => {
  try {
    const res = await instance.post("/login/", userData);
    const { token } = res.data;
    dispatch(setCurrentUser(token));
  } catch (error) {
    console.log(error.response.data);
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
  } catch (error) {
    console.error(error);
    console.log(error.response.data);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => setCurrentUser();

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
