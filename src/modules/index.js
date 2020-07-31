import userAction from './userAction';
import myPage from './myPage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    myPage,
    userAction,
})

export default rootReducer;