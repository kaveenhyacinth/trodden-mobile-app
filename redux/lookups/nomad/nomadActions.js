import api from "../../../api";
import {
  FETCH_LN_REQUEST,
  FETCH_LN_SUCCESS,
  FETCH_LN_FAILURE,
  RESET_LN,
} from "./lookupTypes";

const fetchLookupNomadRequest = () => ({
  type: FETCH_LN_REQUEST,
});

const fetchLookupNomadSuccess = (user, memories) => ({
  type: FETCH_LN_SUCCESS,
  payload: { user, memories },
});

const fetchLookupNomadFailure = (error) => ({
  type: FETCH_LN_FAILURE,
  payload: { error },
});

export const fetchNomadLookup = (nomadId) => async (dispatch) => {
  try {
    dispatch(fetchLookupNomadRequest());
    const userRes = await api.get.getNomadById(nomadId);
    const memoriesRes = await api.get.getMemoriesByUser(nomadId);
    if (!userRes.data.success || !memoriesRes.data.success)
      throw new Error("Something went wrong while loading the Nomad");
    const user = userRes.data.result;
    const memories = memoriesRes.data.result;
    dispatch(fetchLookupNomadSuccess(user, memories));
  } catch (error) {
    console.error("Error at lookupNomad", error);
    dispatch(fetchLookupNomadFailure(error.message));
  }
};

export const resetNomadLookup = () => ({
  type: RESET_LN,
});
