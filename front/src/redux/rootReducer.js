import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";
import locationsReducer from "./reducers/locationsReducer";
import crumbsReducer from "./reducers/crumbsReducer";
import clientsReducer from "./reducers/clientsReducer";
import windowReducer from "./reducers/windowReducer";
import quickIntervalReducer from "./reducers/quickIntervalReducer";


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  locations: locationsReducer,
  crumbs: crumbsReducer,
  clientsData: clientsReducer,
  windowHeight: windowReducer,
  quickInterval: quickIntervalReducer,
});

export default rootReducer;