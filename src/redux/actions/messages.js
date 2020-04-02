import {
  SEND_MESSAGE,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  LOADING
} from "./actionTypes";
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
  console.log("here"); // remove this console log
  return {
    type: CLEAR_MESSAGES,
    payload: [] // you don't need to pass it a payload
  };
};
