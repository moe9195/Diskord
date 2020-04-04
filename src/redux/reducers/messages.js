import {
  SET_MESSAGES,
  SEND_MESSAGE,
  CLEAR_MESSAGES,
} from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGES:
      return state.concat(payload);
    case CLEAR_MESSAGES:
      return payload;
    default:
      return state;
  }
};
