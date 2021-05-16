import api from "../../api";
import * as TYPE from "./requestTypes";

const fetchReqRequest = () => ({
  type: TYPE.FETCH_R_REQUEST,
});

const fetchIncomingReqSuccess = (requests) => ({
  type: TYPE.FETCH_RI_SUCCESS,
  paylaod: requests,
});

const fetchIncomingReqFailure = (error) => ({
  type: TYPE.FETCH_RI_FAILURE,
  paylaod: error,
});

const fetchOutgoingReqSuccess = (requests) => ({
  type: TYPE.FETCH_RO_SUCCESS,
  paylaod: requests,
});

const fetchOutgoingReqFailure = (error) => ({
  type: TYPE.FETCH_RO_FAILURE,
  paylaod: error,
});

export const fetchIncomingReqs = (userId) => async (dispatch) => {
  try {
    dispatch(fetchReqRequest());
    const response = await api.get.getIncomingBonds(userId);
    if (!response.data.success) throw new Error(response.data.msg);
    const requests = response.data.result;
    dispatch(fetchIncomingReqSuccess(requests));
  } catch (error) {
    console.error("Error at fetchIncommingReqs", error);
    dispatch(fetchIncomingReqFailure(error.message));
  }
};

export const fetchOutgoingReqs = (userId) => async (dispatch) => {
  try {
    dispatch(fetchReqRequest());
    const response = await api.get.getOutgoingBonds(userId);
    if (!response.data.success) throw new Error(response.data.msg);
    const requests = response.data.result;
    dispatch(fetchOutgoingReqSuccess(requests));
  } catch (error) {
    console.error("Error at fetchOutgoingReqs", error);
    dispatch(fetchOutgoingReqFailure(error.message));
  }
};
