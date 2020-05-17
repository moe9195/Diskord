import { SET_MESSAGES, CLEAR_MESSAGES, LOADING } from "./actionTypes";
import instance from "./instance";

export const fetchMessages = (channelID, timeStamp) => async dispatch => {
  try {
    const res = await instance.get(
      `channels/${channelID}/?latest=${timeStamp}`
    );

    const messages = res.data;
    dispatch({
      type: LOADING,
      payload: false
    });
    dispatch({
      type: SET_MESSAGES,
      payload: messages
    });
  } catch (error) {
    console.error(error);
  }
};

export const postMessage = (channelID, message) => async dispatch => {
  try {
    const res = await instance.post(`channels/${channelID}/send/`, message);
  } catch (error) {
    console.error(error);
  }
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
    payload: []
  };
};
