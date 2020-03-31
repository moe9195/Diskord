import { ADD_CHANNEL, SET_CHANNELS } from "./actionTypes";
import instance from "./instance";

export const fetchChannels = () => async dispatch => {
  try {
    const res = await instance.get("/channels/");
    const channels = res.data;
    dispatch({
      type: SET_CHANNELS,
      payload: channels
    });
  } catch (error) {
    console.error(error);
  }
};

export const postChannel = channel => async dispatch => {
  try {
    const res = await instance.post("/channels/create/", channel);
    const newChannel = res.data;
    dispatch({
      type: ADD_CHANNEL,
      payload: newChannel
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearChannels = () => {
  return {
    type: SET_CHANNELS,
    payload: []
  };
};
