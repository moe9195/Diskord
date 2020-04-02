import { CURRENT_CHANNEL, LOADING } from "./actionTypes";

export const getCurrentChannel = channel => {
  return {
    type: CURRENT_CHANNEL,
    payload: channel
  };
};

export const toggleLoading = () => {
  return {
    type: LOADING,
    payload: true
  };
};
