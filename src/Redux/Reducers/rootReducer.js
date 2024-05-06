import {combineReducers} from 'redux';
import {deviceLocationReducer} from './deviceLocationReducer';

const rootReducer = combineReducers({
  deviceLocationReducer,
});

export default rootReducer;
