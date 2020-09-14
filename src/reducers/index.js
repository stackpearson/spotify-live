import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {favesReducer} from './favesReducer';
import {playbackReducer} from './playbackReducer';
import {graphReducer} from './graphReducer';

export const rootReducer = combineReducers({
    userReducer,
    favesReducer,
    playbackReducer,
    graphReducer
})