import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";
import errorReducer from "./errors";
import channelReducer from "./channels";
import messageReducer from "./messages";
import managerReducer from "./manager";
import coronaReducer from "./corona";

export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  channels: channelReducer,
  messages: messageReducer,
  manager: managerReducer,
  corona: coronaReducer,
});
