import { ADD_CHANNEL } from "../actions/actionTypes";

/*
 *
 * You have to receives the list of channels from the backend API.
 * So the two cards you have for channels that are in the Done list
 * should be moved back to Doing or Backlog.
 * Look at the Project Description on Warehouse for details on this.
 *
 */

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
