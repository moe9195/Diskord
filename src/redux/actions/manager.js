import { CURRENT_CHANNEL } from "./actionTypes";

export const getCurrentChannel = channel => {
  return {
    type: CURRENT_CHANNEL,
    payload: channel
  };
};
