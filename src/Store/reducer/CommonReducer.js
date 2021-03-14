import {
    SHOW_LOADER, FETCH_FAILED,
    CURRENT_API
} from '../../Common/StoreActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    fetchFailed: false,
    message: null,
    api_type: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, api_type: null, isLoading: action.payload, fetchFailed: false,  message: null }
        case FETCH_FAILED:
            return { ...state, api_type: null, isLoading: false, fetchFailed: true, message: action.payload }
        case CURRENT_API:
            return { ...state, api_type: action.payload, fetchFailed: false,  message: null }
        default:
            return state;
    }
}