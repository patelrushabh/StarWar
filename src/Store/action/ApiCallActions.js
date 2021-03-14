import NetInfo from "@react-native-community/netinfo";
import { store } from "../../../App";
import axios from 'axios'

/* GET Api Call */
export async function getFetch(apiUrl, actionType, header, body = {}) {
  const mObj = await NetInfo.fetch();
  store.dispatch({ type: actionType });
  if (mObj.isConnected) {
    const response = axios.get(apiUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }).then(response => {
                var result = response
                console.log(result , 'get current method result-->')
                    const httpStatus = response.status
                    const httpMessage = response.statusText
                    result.code = httpStatus
                    if (httpStatus == 200) {
                      result.status = 'SUCCESS'
                    } else {
                    if (!result.message) {
                        result.message = httpMessage
                      }
                    }
                    return result
                })
      .catch((error) => {
        console.log(error);
        return {
          responseCode: 404,
          message: "Network Error! Please try again later.",
        };
      });
    return response;
  } else {
    return { responseCode: 404, message: "Network Error! Please try again later." }
  }
}

export var getApi = (apiUrl, actionType, header, body = {}) => {
  return new Promise(async (resolve, reject) => {
    const resData = await getFetch(apiUrl, actionType, header, body);
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." })
    } else if (resData.code == 401 || resData.code == 400) {
      reject(resData)
    } else {
      resolve(resData)
    }
  });
}
