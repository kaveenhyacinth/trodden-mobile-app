import {
  ADD_DAY_DATA,
  ADD_TRIP_DATA,
  UPDATE_DAY_DATA,
  RESET_TRIP,
} from "./tripPlanTypes";

export const addDayPlan = (dayObj) => {
  return {
    type: ADD_DAY_DATA,
    payload: dayObj,
  };
};

export const updateDayPlan = (index, data) => {
  return {
    type: UPDATE_DAY_DATA,
    payload: { index, data },
  };
};

export const addTripPlan = (tripObj) => {
  return {
    type: ADD_TRIP_DATA,
    payload: tripObj,
  };
};

export const resetTripPlan = () => {
  return {
    type: RESET_TRIP,
  };
};
