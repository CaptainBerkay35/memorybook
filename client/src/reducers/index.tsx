import { combineReducers } from "redux";
import posts from './posts';
import user from './auth';
import userProfile from "./userProfile";

export default combineReducers({
    posts,
    user,
    userProfile,
});