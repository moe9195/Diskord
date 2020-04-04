import { CORONA } from "../actions/actionTypes";

const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CORONA:
      const data = action.payload;
      return data;
    default:
      return state;
  }
};

export default reducer;
