import api from "../../api";
import {
  FETCH_NOMAD_FEED_REQUEST,
  FETCH_NOMAD_FEED_SUCCESS,
  FETCH_NOMAD_FEED_FAILURE,
} from "./feedTypes";

const fetchFeedRequest = () => ({
  type: FETCH_NOMAD_FEED_REQUEST,
  payload: [],
});

const fetchFeedSuccess = (feed) => ({
  type: FETCH_NOMAD_FEED_SUCCESS,
  payload: feed,
});

const fethcFeedFailure = (error) => ({
  type: FETCH_NOMAD_FEED_FAILURE,
  payload: error,
});

export const fetchFeed = (userId) => async (dispatch) => {
  try {
    dispatch(fetchFeedRequest());
    const response = await api.get.getFeed(userId);
    if (!response.data.result)
      throw new Error("Our servers are too busy! Please try again later...");
    const feed = response.data.result;
    dispatch(fetchFeedSuccess(feed));
  } catch (error) {
    console.error("Error at fetchFeed", error);
    dispatch(fethcFeedFailure(error.message));
  }
};
