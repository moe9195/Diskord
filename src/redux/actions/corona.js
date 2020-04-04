import { CORONA, LOAD_CORONA } from "./actionTypes";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/global/latest",
});

export const fetchCoronaData = () => async (dispatch) => {
  try {
    const res = await instance.get("");
    const data = res.data;
    dispatch({
      type: CORONA,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
