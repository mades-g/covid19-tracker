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

export const fetchStats = (isToggled) => async dispatch => {
    let fetchAction = fetchGlobalStats;

    if (isToggled) {
        fetchAction = fetchCountryStats;
    }

    dispatch(fetchAction());
};

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export const normalizeStatisticsPayload = (payload) => {
    return {
        cases: {
            total: payload.total_cases,
            deaths: payload.total_deaths,
            recovered: payload.total_recovered,
            active: payload.total_active_cases,
            serious: payload.total_serious_cases,
            source: payload?.info?.source.substr(8) || payload?.source?.url?.substr(8, payload.source.url.length - 9)
        }
    }
};

export const fetchGlobalStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?global=stats', requestOptions);
            let json = await response.json();

            dispatch(fetchingGlobalStatsSuccess(normalizeStatisticsPayload(json.results[0])));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};

export const fetchCountryStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTotal=PT', requestOptions)
            let json = await response.json();

            dispatch(fetchingCountryStatsSuccess(normalizeStatisticsPayload(json.countrydata[0])));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};