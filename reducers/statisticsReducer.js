import {
    FETCHING_GLOBAL_CASES_SUCCESS,
    FETCHING_COUNTRY_CASES_SUCCESS,
    FETCHING_CASES_FAILURE,
    FETCHING_CASES_REQUEST
} from '../actions/types';

export const initialState = {
    isFetching: false,
    stats: {},
    errorMessage: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCHING_CASES_REQUEST:
            return { ...state, isFetching: true }
        case FETCHING_COUNTRY_CASES_SUCCESS:
            return { ...state, isFetching: false, stats: { cases: action.payload.cases }}
        case FETCHING_GLOBAL_CASES_SUCCESS:
            return { ...state, isFetching: false, stats: { cases: action.payload.cases  }}
        case FETCHING_CASES_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload }
        default:
            return state;
    }
}