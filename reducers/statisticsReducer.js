import {
    FETCHING_GLOBAL_CASES_SUCCESS,
    FETCHING_COUNTRY_CASES_SUCCESS,
    FETCHING_CASES_FAILURE,
    FETCHING_CASES_REQUEST,
    FETCHING_TIMELINE_REQUEST,
    FETCHING_TIMELINE_FAILURE,
    FETCHING_COUNTRY_TIMELINE_SUCCESS,
    FETCHING_GLOBAL_TIMELINE_SUCCESS,
} from '../actions/types';

export const initialState = {
    isFetching: false,
    stats: {},
    timeline: [],
    errorMessage: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCHING_CASES_REQUEST:
            return { ...state, isFetching: true }
        case FETCHING_TIMELINE_REQUEST:
            return { ...state, isFetching: true }
        case FETCHING_COUNTRY_CASES_SUCCESS:
            return { ...state, isFetching: false, stats: action.payload }
        case FETCHING_GLOBAL_CASES_SUCCESS:
            return { ...state, isFetching: false, stats: action.payload }
        case FETCHING_CASES_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload }
        case FETCHING_TIMELINE_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload }
        case FETCHING_COUNTRY_TIMELINE_SUCCESS:
            return { ...state, isFetching: false, timeline: action.payload }
        case FETCHING_GLOBAL_TIMELINE_SUCCESS:
            return { ...state, isFetching: false, timeline: action.payload }
        default:
            return state;
    }
}