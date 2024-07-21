import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

export default rootReducer;