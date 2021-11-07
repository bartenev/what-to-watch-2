import axios from "axios";
// import {ActionCreator} from "./reducer/user/user";

export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  // const onSuccess = (response) => response;
  // const onFail = (err) => {
  //   if (err.response.status === 403) {
  //     dispatch(ActionCreator.requireAuthorization(true));
  //   }
  //   return err;
  // };

  // api.interceptors.response.use(onSuccess, onFail);

  return api;
};
