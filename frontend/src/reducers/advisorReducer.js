import {
  ADVISOR_SEARCH_REQUEST,
  ADVISOR_SEARCH_SUCCESS,
  ADVISOR_SEARCH_FAIL,
} from "../constants/advisorConstants";

export const advisorSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case ADVISOR_SEARCH_REQUEST:
      return { loading: true };
    case ADVISOR_SEARCH_SUCCESS:
      return {
        loading: false,
        advisorData: action.payload,
        success: true,
      };
    case ADVISOR_SEARCH_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
