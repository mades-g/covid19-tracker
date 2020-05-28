import { TOGGLE_LOCALE_SWITCH } from "./types";

export const toggleLocaleSwitch = () => ({ type: TOGGLE_LOCALE_SWITCH });

export const toggleSwitch = () => {
    return async dispatch => {
        dispatch(toggleLocaleSwitch());
    };
};