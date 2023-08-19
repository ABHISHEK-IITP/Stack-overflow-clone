import { combineReducers } from "redux";
import authReducer from './auth'
import currentUserReducer from './currentUser'
import questionsReducer from './questions'
import usersReducer from "./users";
import subscriptionReducer from "./subscription";
import chatReducer from './chat';
import errorReducer from './error';
import otpReducer from "./otp";

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer, subscriptionReducer,chatReducer,errorReducer,otpReducer
})