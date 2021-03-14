

import {  FETCH_LISTING_FETCH, FETCH_LISTING_FETCH_SUCCESS, FETCH_LISTING_FETCH_ERROR } from '../../Common/StoreActionTypes';

const INITIAL_STATE = {
    data: null,
    isLoading: false,
    message: null
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_LISTING_FETCH:
            return { ...state, isLoading: true, message: null, data:null  }
            break;
        case FETCH_LISTING_FETCH_SUCCESS:
            return { ...state, isLoading: false, message: null, data: action.payload }
            break;
        case FETCH_LISTING_FETCH_ERROR:
            return { ...state, isLoading: false, message: action.payload, data:null}
            break;
        default:
            return state;
    }
}