import { CURRENT_CHANNEL, LOADING, COLOR_MODE } from "../actions/actionTypes";

const initialState = { currentChannel: null, loading: true, darkmode: true };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CURRENT_CHANNEL:
      return { ...state, currentChannel: payload };
    case LOADING:
      return { ...state, loading: payload };
    case COLOR_MODE:
      return { ...state, darkmode: payload };

    default:
      return state;
  }
};
