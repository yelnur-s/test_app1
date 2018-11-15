import {SET_CURRENT_USER} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
}


export default function(state=initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return  {
                ...state,
                user: action.payload.user,
                isAuthenticated: action.payload.isAuthenticated
            }

        default:
            return state;

    }
}