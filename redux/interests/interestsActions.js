import api from "../../api";
import {
  FETCH_INTERESTS_REQUEST,
  FETCH_INTERESTS_SUCCESS,
  FETCH_INTERESTS_FAILURE,
} from "./interestsTypes";

const fetchInterestsRequest = () => {
  return {
    type: FETCH_INTERESTS_REQUEST,
    payload: [],
  };
};

const fetchInterestsSuccess = (interests) => {
  return {
    type: FETCH_INTERESTS_SUCCESS,
    payload: interests,
  };
};

const fetchInterestsFailure = (error) => {
  return {
    type: FETCH_INTERESTS_FAILURE,
    payload: error,
  };
};

export const fetchInterests = () => async (dispatch) => {
  try {
    dispatch(fetchInterestsRequest());
    const response = await api.get.getInterests();
    if (!response.data.result) throw new Error("Something went wrong");
    const interests = response.data.result;
    dispatch(fetchInterestsSuccess(interests));
  } catch (error) {
    const errorMsg = error.message;
    dispatch(fetchInterestsFailure(errorMsg));
  }
};
