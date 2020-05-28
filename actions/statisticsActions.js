import {
    FETCHING_GLOBAL_CASES_SUCCESS,
    FETCHING_COUNTRY_CASES_SUCCESS,
    FETCHING_CASES_FAILURE,
    FETCHING_CASES_REQUEST,
    FETCHING_GLOBAL_TIMELINE_SUCCESS,
    FETCHING_COUNTRY_TIMELINE_SUCCESS,
    FETCHING_TIMELINE_REQUEST,
    FETCHING_TIMELINE_FAILURE
} from './types';
import { formatDate } from '../utils/date';

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

export const fetchingGlobalTimelineSuccess = json => ({
    type: FETCHING_GLOBAL_TIMELINE_SUCCESS,
    payload: json
});

export const fetchingCountryTimelineSuccess = json => ({
    type: FETCHING_COUNTRY_TIMELINE_SUCCESS,
    payload: json
});

export const fetchingTimelineRequest = () => ({ type: FETCHING_TIMELINE_REQUEST });

export const fetchingTimelineFailure = error => ({
    type: FETCHING_TIMELINE_FAILURE,
    payload: error
});

export const fetchStats = (isToggled) => async dispatch => {
    let fetchAction = fetchGlobalStats;

    if (isToggled) {
        fetchAction = fetchCountryStats;
    }

    dispatch(fetchAction());
};

export const fetchTimeline = (isToggled) => async dispatch => {
    let fetchAction = fetchGlobalTimeline;

    if (isToggled) {
        fetchAction = fetchCountryTimeline;
    }

    dispatch(fetchAction());
};

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export const normalizeCasesStatsPayload = payload => {
    return {
        total: payload.total_cases,
        deaths: payload.total_deaths,
        recovered: payload.total_recovered,
        active: payload.total_active_cases,
        serious: payload.total_serious_cases,
        source: payload?.info?.source.substr(8) || payload?.source?.url?.substr(8, payload.source.url.length - 9)
    }
};

export const fetchGlobalStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=AT', requestOptions);
            let json = await response.json();

            dispatch(fetchingGlobalStatsSuccess(normalizeCasesStatsPayload(json.results[0])));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};

export const fetchCountryStats = () => {
    return async dispatch => {
        dispatch(fetchingStatsRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=AT', requestOptions)
            let json = await response.json();

            dispatch(fetchingCountryStatsSuccess(normalizeCasesStatsPayload(json.countrydata[0])));
        } catch (error) {
            dispatch(fetchingStatsFailure(error));
        }
    };
};

export const normalizeTimelineStatsPayload = (timeLineStats) => {
    return Object.keys(timeLineStats).map(
        (timelineDateId) => {
            return {
                date: timelineDateId,
                newDailyCases: timeLineStats[timelineDateId].new_daily_cases,
                newDailyDeaths: timeLineStats[timelineDateId].new_daily_deaths,
                totalCases: timeLineStats[timelineDateId].total_cases,
                totalRecoveries: timeLineStats[timelineDateId].total_recoveries,
                totalDeaths: timeLineStats[timelineDateId].total_deaths

            }
        }
    );
}

export const fetchGlobalTimeline = () => {
    return async dispatch => {
        dispatch(fetchingTimelineRequest());
        try {
            let response = await fetch('https://thevirustracker.com/timeline/map-data.json', requestOptions);
            let json = await response.json();

            dispatch(fetchingGlobalTimelineSuccess(json.data[0]));
        } catch (error) {
            dispatch(fetchingTimelineFailure(error));
        }
    };
};

export const fetchCountryTimeline = () => {
    return async dispatch => {
        dispatch(fetchingTimelineRequest());
        try {
            let response = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=AT', requestOptions);

            let json = await response.json();

            delete json.timelineitems[0].stat;

            const result = normalizeTimelineStatsPayload(json.timelineitems[0]).slice(0, 2);

            dispatch(fetchingCountryTimelineSuccess(result));
        } catch (error) {
            console.log(error)
            dispatch(fetchingTimelineFailure(error));
        }
    };
};