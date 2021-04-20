import { combineReducers } from "redux";
import user from "./auth";
import conversation from "./conversation";

//from conversation there is user but I already have user in line 2
export default combineReducers({ user, conversation });
