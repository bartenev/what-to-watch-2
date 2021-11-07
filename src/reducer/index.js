import {combineReducers} from "redux";
import NameSpace from "./name-spaces";
import {reducer as app} from "./app/app";
// import {reducer as data} from "./data/data";
// import {reducer as user} from "./user/user";

export default combineReducers({
  [NameSpace.APP]: app,
  // [NameSpace.GAME]: game,
  // [NameSpace.USER]: user,
});
