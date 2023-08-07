import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  dependencySearchReducer,
  prerequisiteSearchReducer,
  relationshipSearchReducer,
} from "./reducers/courseReducer";
import { advisorSearchReducer } from "./reducers/advisorReducer";

const reducer = combineReducers({
  //This will contain our reducers
  userLogin: userLoginReducer,
  prerequisiteSearch: prerequisiteSearchReducer,
  relationshipSearch: relationshipSearchReducer,
  dependencySearch: dependencySearchReducer,
  advisorSearch: advisorSearchReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const prerequisiteDataFromStorage = localStorage.getItem("prerequisiteData")
  ? JSON.parse(localStorage.getItem("prerequisiteData"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  prerequisiteSearch: { prerequisiteData: prerequisiteDataFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
