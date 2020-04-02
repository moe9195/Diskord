import { CURRENT_CHANNEL, LOADING } from "../actions/actionTypes";

const initialState = { currentChannel: null, loading: true };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENT_CHANNEL:
      return { ...state, currentChannel: payload };
    case LOADING:
      return { ...state, loading: payload };

    default:
      return state;
  }
};
