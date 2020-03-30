import { ADD_CHANNEL } from "./actionTypes";
export const addChannel = channel => {
  return {
    type: ADD_CHANNEL,
    payload: channel
  };
};
