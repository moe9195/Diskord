import { CURRENT_CHANNEL } from "../actions/actionTypes";

const initialState = { currentChannel: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENT_CHANNEL:
      return { ...state, currentChannel: payload };

    default:
      return state;
  }
};
