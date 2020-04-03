import { CURRENT_CHANNEL, LOADING, COLOR_MODE } from "./actionTypes";

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

export const toggleDarkMode = mode => {
  return {
    type: COLOR_MODE,
    payload: mode
  };
};
