import {extend, Genres} from "./const";
import films from "./mocks/films";
import {SHOW_MORE_BUTTON_INITIAL_VALUE, SHOW_MORE_BUTTON_STEP} from "./const";

const initialState = {
  genre: Genres.ALL_GENRES,
  films,
  filteredFilms: films,
  numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS: `GET_FILMS`,
  RESET_FILTER: `RESET_FILTER`,
  INCREASE_NUMBER_OF_SHOWN_FILMS: `INCREASE_NUMBER_OF_SHOWN_FILMS`,
  SET_DEFAULT_NUMBER_OF_SHOWN_FILMS: `SET_DEFAULT_NUMBER_OF_SHOWN_FILMS`,
};

const getFilmsOfSelectedGenre = (genre, allFilms) => {
  let filmsOfSelectedGenre;
  if (genre === Genres.ALL_GENRES) {
    filmsOfSelectedGenre = allFilms;
  } else {
    filmsOfSelectedGenre = allFilms.filter((film) => film.genre === genre);
  }

  return filmsOfSelectedGenre;
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),

  getFilms: () => ({
    type: ActionType.GET_FILMS,
  }),

  increaseNumberOfShownFilms: () => ({
    type: ActionType.INCREASE_NUMBER_OF_SHOWN_FILMS,
    payload: SHOW_MORE_BUTTON_STEP,
  }),

  setDefaultNumberOfShownFilms: () => ({
    type: ActionType.SET_DEFAULT_NUMBER_OF_SHOWN_FILMS,
  }),

  resetFilter: () => ({
    type: ActionType.RESET_FILTER,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.GET_FILMS:
      const selectedFilms = getFilmsOfSelectedGenre(state.genre, films);
      return extend(state, {
        filteredFilms: selectedFilms, // .slice(0, state.numberOfShownFilms),
      });

    case ActionType.INCREASE_NUMBER_OF_SHOWN_FILMS:
      return extend(state, {
        numberOfShownFilms: state.numberOfShownFilms + action.payload,
      });

    case ActionType.SET_DEFAULT_NUMBER_OF_SHOWN_FILMS:
      return extend(state, {
        numberOfShownFilms: initialState.numberOfShownFilms,
      });

    case ActionType.RESET_FILTER:
      return extend({}, initialState);
  }

  return state;
};

export {reducer, getFilmsOfSelectedGenre, ActionType, ActionCreator};
