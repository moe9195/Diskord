import { SEND_MESSAGE, SET_MESSAGES } from "./actionTypes";
import instance from "./instance";

export const fetchMessages = channelID => async dispatch => {
  try {
    const res = await instance.get(`channels/${channelID}/`);
    const messages = res.data;
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
    const newMessage = res.data;
    dispatch({
      type: SEND_MESSAGE,
      payload: newMessage
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearMessages = () => {
  return {
    type: SET_MESSAGES,
    payload: []
  };
};
