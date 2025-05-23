import { combineReducers } from "redux";
import posts from './posts';
import user from './auth';

export default combineReducers({
    posts,
    user,
});