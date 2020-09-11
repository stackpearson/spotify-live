import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {favesReducer} from './favesReducer';

export const rootReducer = combineReducers({
    userReducer,
    favesReducer
})