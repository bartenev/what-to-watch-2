import {extend} from "../../const";
import {ActionCreator as AppActionCreator} from "../app/app";

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {
    id: null,
    email: null,
    name: null,
    avatar: null,
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setUserInfo: (userInfo) => ({
    type: ActionType.SET_USER_INFO,
    payload: userInfo,
  })
};

// для тестов редакса
// {
//     type: `REQUIRED_AUTHORIZATION`,
//     payload: `AUTH`,
//   }

const userInfoAdapter = (data) => ({
  id: data.id,
  email: data.email,
  name: data.name,
  avatar: data.avatar_url,
});

const Operations = {
  checkAuth: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserInfo(userInfoAdapter(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },

  logIn: (authData) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserInfo(userInfoAdapter(response.data)));
        // dispatch(AppActionCreator.setLastScreenType());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER_INFO:
      return extend(state, {
        userInfo: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
