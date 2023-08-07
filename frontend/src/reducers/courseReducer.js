import {
  DEPENDENCY_SEARCH_FAIL,
  DEPENDENCY_SEARCH_REQUEST,
  DEPENDENCY_SEARCH_SUCCESS,
  PREREQUISITE_SEARCH_FAIL,
  PREREQUISITE_SEARCH_REQUEST,
  PREREQUISITE_SEARCH_SUCCESS,
  RELATIONSHIP_SEARCH_FAIL,
  RELATIONSHIP_SEARCH_REQUEST,
  RELATIONSHIP_SEARCH_SUCCESS,
} from "../constants/courseConstants";

export const prerequisiteSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case PREREQUISITE_SEARCH_REQUEST:
      return { loading: true };
    case PREREQUISITE_SEARCH_SUCCESS:
      return {
        loading: false,
        prerequisiteData: action.payload,
        success: true,
      };
    case PREREQUISITE_SEARCH_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const relationshipSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case RELATIONSHIP_SEARCH_REQUEST:
      return { loading: true };
    case RELATIONSHIP_SEARCH_SUCCESS:
      return {
        loading: false,
        relationshipData: action.payload,
        success: true,
      };
    case RELATIONSHIP_SEARCH_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const dependencySearchReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPENDENCY_SEARCH_REQUEST:
      return { loading: true };
    case DEPENDENCY_SEARCH_SUCCESS:
      return {
        loading: false,
        dependencyData: action.payload,
        success: true,
      };
    case DEPENDENCY_SEARCH_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
