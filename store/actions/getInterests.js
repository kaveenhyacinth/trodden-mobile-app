import { GET_INTERESTS } from "../actionTypes";
import Http from "../../api/kit";

export const getInterests = () => {
  return async (dispatch) => {
    let interests;

    try {
      const response = await Http.get("/api/interests");
      if (!response) throw new Error("Didn't get any interest");
      interests = response.data.result;
    } catch (error) {
      console.log("Error at Get Interests action", error);
      throw error;
    }

    dispatch({
      type: GET_INTERESTS,
      payload: interests,
    });
  };
};
