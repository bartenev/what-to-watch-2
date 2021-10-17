import {extend, Genres} from "./const";
import films from "./mocks/films";

const initialState = {
  genre: Genres.ALL_GENRES,
  films,
  filteredFilms: films,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS: `GET_FILMS`,
  RESET_FILTER: `RESET_FILTER`
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
        filteredFilms: selectedFilms,
      });

    case ActionType.RESET_FILTER:
      return extend({}, initialState);
  }

  return state;
};

export {reducer, getFilmsOfSelectedGenre, ActionType, ActionCreator};
