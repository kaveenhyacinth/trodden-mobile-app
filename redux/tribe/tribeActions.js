import api from "../../api";
import * as TYPE from "./tribeTypes";

const fetchTribeRequest = () => ({
  type: TYPE.FETCH_T_REQUEST,
});

const fetchTribeNomadsSuccess = (nomads) => ({
  type: TYPE.FETCH_TN_SUCCESS,
  payload: nomads,
});

const fetchTribeNomadsFailure = (error) => ({
  type: TYPE.FETCH_TN_FAILURE,
  payload: error,
});

export const fetchNomadsTribe = (userId) => async (dispatch) => {
  try {
    dispatch(fetchTribeRequest());
    const response = await api.get.getBondsList(userId);
    if (!response.data.success) throw new Error(response.data.msg);
    const nomads = response.data.result;
    dispatch(fetchTribeNomadsSuccess(nomads));
  } catch (error) {
    console.error("Error at fetchTribeNomads", error);
    dispatch(fetchTribeNomadsFailure(error.message));
  }
};
