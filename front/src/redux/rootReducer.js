import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import locationsReducer from "./reducers/locationsReducer";


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  locations: locationsReducer,
});

export default rootReducer;