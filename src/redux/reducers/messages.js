import { SET_MESSAGES, SEND_MESSAGE } from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGES:
      return payload;
    case SEND_MESSAGE:
      return state.concat(payload);

    default:
      return state;
  }
};
