import api from "../../api";
import * as TYPE from "./suggestionTypes";

const fetchSuggestionsRequest = () => ({
  type: TYPE.FETCH_SUGGESTIONS_REQUEST,
  payload: [],
});

const fetchNomadSuggestionsSuccess = (suggestions) => ({
  type: TYPE.FETCH_NOMAD_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

const fethcNomadSuggestionsFailure = (error) => ({
  type: TYPE.FETCH_NOMAD_SUGGESTIONS_FAILURE,
  payload: error,
});

const fetchCaravanSuggestionsSuccess = (suggestions) => ({
  type: TYPE.FETCH_CARAVAN_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

const fethcCaravanSuggestionsFailure = (error) => ({
  type: TYPE.FETCH_CARAVAN_SUGGESTIONS_FAILURE,
  payload: error,
});

export const fetchNomadSuggestions = (userId) => async (dispatch) => {
  try {
    dispatch(fetchSuggestionsRequest());
    const response = await api.get.getNomadSuggestions(userId);
    if (!response.data.success)
      throw new Error("Our servers are too busy! Please try again later...");
    const suggestions = response.data.result;
    dispatch(fetchNomadSuggestionsSuccess(suggestions));
  } catch (error) {
    console.error("Error at fetchNomadSuggestions", error);
    dispatch(fethcNomadSuggestionsFailure(error.message));
  }
};

export const fetchCaravanSuggestions = (userId) => async (dispatch) => {
  try {
    dispatch(fetchSuggestionsRequest());
    const response = await api.get.getCaravanSuggestions(userId);
    if (!response.data.success)
      throw new Error("Our servers are too busy! Please try again later...");
    const suggestions = response.data.result;
    dispatch(fetchCaravanSuggestionsSuccess(suggestions));
  } catch (error) {
    console.error("Error at fetchCaravanSuggestions", error);
    dispatch(fethcCaravanSuggestionsFailure(error.message));
  }
};
