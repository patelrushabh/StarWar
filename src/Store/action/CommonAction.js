import {  FETCH_FAILED } from "../../Common/StoreActionTypes";

export const fetchFail = (dispatch, err) => {
        dispatch({
            type: FETCH_FAILED,
            payload: err.message
        });
}
