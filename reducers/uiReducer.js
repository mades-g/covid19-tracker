import { TOGGLE_LOCALE_SWITCH } from "../actions/types";

const initialState = {
    isToggled: true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_LOCALE_SWITCH:
            return {
                isToggled: !state.isToggled
            }
        default:
            return state;
    }
}

