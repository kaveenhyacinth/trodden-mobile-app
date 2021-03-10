import { GET_INTERESTS, INTERESTS_ERROR } from "../actionTypes";
import Http from "../../api/kit";

export const getInterests = () => async (dispatch) => {
  try {
    const response = await Http.get("/api/interests");
    if (!response) throw new Error("Something went wrong");
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
