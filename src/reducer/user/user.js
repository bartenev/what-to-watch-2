import {extend} from "../../const";

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOG_IN: `LOG_IN`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logIn: (data) => ({
    type: ActionType.LOG_IN,
    payload: data,
  }),
};

const Operations = {
  checkAuth: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
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
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.LOG_IN:
      return extend(state, {
        loginInfo: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
