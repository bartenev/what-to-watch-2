import NameSpace from "../name-spaces";
// import {Genres, SHOW_MORE_BUTTON_INITIAL_VALUE} from "../../const";
// import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.APP;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getFilteredFilms = (state) => {
  return state[NAME_SPACE].filteredFilms;
};

export const getNumberOfShownFilms = (state) => {
  return state[NAME_SPACE].numberOfShownFilms;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

// export const getGenreQuestions = createSelector(
//     getQuestions,
//     (questions) => questions.filter((it) => it.type === `genre`)
// );

// const randomFilter = (_state) => {
//   return Math.random() > 0.5;
// };

// export const getArtisQuestions = createSelector(
//     getQuestions,
//     randomFilter,
//     (resultOne, resultTwo) => {
//       return resultOne.filter((it) => resultTwo && it.type === `artist`);
//     }
// );
