import { ADD_CHANNEL } from "../actions/actionTypes";

const initialState = {
  channels: [{ name: "Channel1" }]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return {
        channels: [action.payload].concat(state.channels)
      };
    default:
      return state;
  }
};

export default reducer;
