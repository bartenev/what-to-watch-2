import NameSpace from "../name-spaces";
import {Genres} from "../../const";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getNumberOfShownFilms = (state) => {
  return state[NAME_SPACE].numberOfShownFilms;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getFilteredFilms = createSelector(
    getFilms,
    getGenre,
    (films, genre) => films.filter((film) => {
      if (genre === Genres.ALL_GENRES) {
        return true;
      }

      return film.genre === genre;
    })
);

export const getFilm = (state) => (id) => {
  const films = getFilms(state);
  return films.find((film) => film.id === id);
};

export const getFirstFilm = (state) => {
  const films = getFilms(state);
  return films[0];
};

