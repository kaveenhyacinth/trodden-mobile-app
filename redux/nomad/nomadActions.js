import api from "../../api";
import {
  FETCH_NOMAD_PROFILE_REQUEST,
  FETCH_NOMAD_PROFILE_SUCCESS,
  FETCH_NOMAD_PROFILE_FAILURE,
} from "./nomadTypes";

const fetchNomadProfileRequest = () => ({
  type: FETCH_NOMAD_PROFILE_REQUEST,
  payload: {},
});

const fetchNomadProfileSuccess = (nomad) => ({
  type: FETCH_NOMAD_PROFILE_SUCCESS,
  payload: nomad,
});

const fetchNomadProfileFailure = (error) => ({
  type: FETCH_NOMAD_PROFILE_FAILURE,
  payload: error,
});

export const fetchNomadProfile = (userId) => async (dispatch) => {
  try {
    dispatch(fetchNomadProfileRequest());
    const response = await api.get.getCurrentUser(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    const nomad = response.data.result;
    dispatch(fetchNomadProfileSuccess(nomad));
  } catch (error) {
    console.error("Error at fetchnomad", error);
    dispatch(fetchNomadProfileFailure(error.message));
  }
};
