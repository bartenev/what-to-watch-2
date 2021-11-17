import axios from "axios";
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {AppRoute} from "./const";
import history from "./history";

export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      if (err.response.config.method !== `get`) {
        history.push(AppRoute.LOGIN);
      }
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
