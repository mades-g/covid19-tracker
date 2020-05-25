import { combineReducers } from 'redux';
import casesStatsReducer from './statisticsReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    statistics: casesStatsReducer,
    ui: uiReducer
});