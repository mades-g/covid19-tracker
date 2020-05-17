import { combineReducers } from 'redux';
import casesStatsReducer from './statisticsReducer';

export default combineReducers({
    statistics: casesStatsReducer
});