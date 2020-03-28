import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      const user = payload;
      return user;
    default:
      return state;
  }
};

export default reducer;
