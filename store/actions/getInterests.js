import { GET_INTERESTS, INTERESTS_ERROR } from "../actionTypes";
import api from "../../api/api";

export const getInterests = () => async (dispatch) => {
  try {
    const response = await api.getInterests();
    if (!response.data.result) throw new Error("Something went wrong");
    dispatch({
      type: GET_INTERESTS,
      payload: response.data.result,
    });
  } catch (error) {
    // dispatch({
    //   type: INTERESTS_ERROR,
    //   payload: console.log("Error at Get Interests action", error),
    // });
    throw error;
  }
};
