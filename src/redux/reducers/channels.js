import { ADD_CHANNEL, SET_CHANNELS } from "../actions/actionTypes";

const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      const channels = action.payload;
      return channels;

    case ADD_CHANNEL:
      return [action.payload].concat(state);
    default:
      return state;
  }
};

export default reducer;
