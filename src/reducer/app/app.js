import {extend, ScreenType} from "../../const";

const initialState = {
  film: null,
  screenType: ScreenType.MAIN,
  lastScreenType: null,
};

const ActionType = {
  SET_SCREEN_TYPE: `SET_SCREEN_TYPE`,
  SET_LAST_SCREEN_TYPE: `SET_LAST_SCREEN_TYPE`,
  SET_FILM: `SET_FILM`,
};

const ActionCreator = {
  setScreenType: (screenType) => ({
    type: ActionType.SET_SCREEN_TYPE,
    payload: screenType,
  }),
  setLastScreenType: () => ({
    type: ActionType.SET_LAST_SCREEN_TYPE,
  }),
  setFilm: (film) => ({
    type: ActionType.SET_FILM,
    payload: film,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SCREEN_TYPE:
      return extend(state, {
        lastScreenType: state.screenType,
        screenType: action.payload,
      });
    case ActionType.SET_LAST_SCREEN_TYPE:
      const currentScreenType = state.screenType;
      return extend(state, {
        screenType: state.lastScreenType,
        lastScreenType: currentScreenType,
      });
    case ActionType.SET_FILM:
      return extend(state, {
        film: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
