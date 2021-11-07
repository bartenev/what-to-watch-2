import axios from "axios";
// import {ActionCreator} from "./reducer/user/user";

// eslint-disable-next-line no-unused-vars
export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  // const onSuccess = (response) => response;
  // const onFail = (err) => {
  //   if (err.response.status === 403) {
  //     dispatch(ActionCreator.requireAuthorization());
  //   }
  //   return err;
  // };
  //
  // api.interceptors.response.use(onSuccess, onFail);

  return api;
};
