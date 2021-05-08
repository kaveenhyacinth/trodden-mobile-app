import {
  ADD_DAY_DATA,
  ADD_TRIP_DATA,
  UPDATE_DAY_DATA,
  RESET_TRIP,
} from "./tripPlanTypes";

const initialState = {
  title: "",
  desc: "",
  start: "",
  end: "",
  dayPlans: [],
};

const tripPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRIP_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_DAY_DATA:
      return {
        ...state,
        dayPlans: [...state.dayPlans, action.payload],
      };
    case UPDATE_DAY_DATA:
      console.log("Array at reducer", {
        index: action.payload.index,
        data: action.payload.data,
      });
      return {
        ...state,
        dayPlans: [
          ...state.dayPlans.splice(
            action.payload.index,
            1,
            action.payload.data
          ),
        ],
      };
    case RESET_TRIP:
      return {
        ...state,
        title: "",
        desc: "",
        start: "",
        end: "",
        dayPlans: [],
      };
    default:
      return state;
  }
};

export default tripPlanReducer;
