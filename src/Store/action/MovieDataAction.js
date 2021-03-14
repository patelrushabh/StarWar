import { Platform } from "react-native";
import {
    SHOW_LOADER, CURRENT_API,
    FETCH_LISTING_FETCH_SUCCESS, FETCH_LISTING_FETCH_ERROR, FETCH_LISTING_FETCH
} from '../../Common/StoreActionTypes';;
import { getApi } from './ApiCallActions';
import { BaseUrl } from '../../Common/ApiConfig';

export const GetDataAction = (ApiParams = {}) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([getApi(BaseUrl,FETCH_LISTING_FETCH, ApiParams)])
          .then(function (values) {
            dispatch({ type: SHOW_LOADER, payload: false });
            /* Handle Response of all Apis */
            setTimeout(
              () => GetDataSuccess(dispatch, values[0]),
              Platform.OS == "android" ? 0 : 1000
            );
          })
          .catch((err) => {
            fetchFail(dispatch, err);
          });
    }
}


const GetDataSuccess = (dispatch, res) => {
    dispatch({
        type: CURRENT_API,
        payload: FETCH_LISTING_FETCH,
      });
    if (res != null && res.code == 200 ) {
        dispatch({
            type: FETCH_LISTING_FETCH_SUCCESS,
            payload: res.data,
        });
    } else {
        dispatch({
            type: FETCH_LISTING_FETCH_ERROR,
            payload: res.message
        });
    }
};
