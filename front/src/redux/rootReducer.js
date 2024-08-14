import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import locationsReducer from "./reducers/locationsReducer";
import crumbsReducer from "./reducers/crumbsReducer";
import clientsReducer from "./reducers/clientsReducer";


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  locations: locationsReducer,
  crumbs: crumbsReducer,
  clientsData: clientsReducer,
});

export default rootReducer;