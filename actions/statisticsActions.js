import {
    FETCHING_GLOBAL_CASES_SUCCESS,
    FETCHING_COUNTRY_CASES_SUCCESS,
    FETCHING_CASES_FAILURE,
    FETCHING_CASES_REQUEST
} from './types';

export const fetchingGlobalStatsSuccess = json => ({
    type: FETCHING_GLOBAL_CASES_SUCCESS,
    payload: json
});

export const fetchingCountryStatsSuccess = json => ({
    type: FETCHING_COUNTRY_CASES_SUCCESS,
    payload: json
});

export const fetchingStatsRequest = () => ({ type: FETCHING_CASES_REQUEST });

export const fetchingStatsFailure = error => ({
    type: FETCHING_CASES_FAILURE,
    payload: error
});

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export const fetchGlobalStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?global=stats', requestOptions);
            let json = await response.json();

            dispatch(fetchingGlobalStatsSuccess(json.results[0]));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};

export const fetchCountryStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTotal=US', requestOptions)
            let json = await response.json();

            dispatch(fetchingCountryStatsSuccess(json.countrydata[0]));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};