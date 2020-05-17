import { TOGGLE_LOCALE } from "./types"

export const toggleLocale = () => dispatch => {
    dispatch({
        type: TOGGLE_LOCALE
    })
};