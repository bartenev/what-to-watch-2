export const TabsType = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`];

export const Genres = {
  ALL_GENRES: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_AND_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const SHOW_MORE_BUTTON_INITIAL_VALUE = 8;
export const SHOW_MORE_BUTTON_STEP = 8;

export const AppRoute = {
  LOGIN: `/login`,
  ROOT: `/`,
  FILMS: `/films`,
  PLAYER: `/player`,
  MY_LIST: `/my-list`,
  ADD_REVIEW: `/add-review`,
};

export const ScreenType = {
  MAIN: `MAIN`,
  FILM_PAGE: `FILM_PAGE`,
  AUTHORIZATION: `AUTHORIZATION`,
  PLAYER: `PLAYER`,
  MY_LIST: `MY_LIST`,
  ADD_REVIEW: `ADD_REVIEW`,
};

export const FavoriteFilmAction = {
  ADD: `ADD`,
  DELETE: `DELETE`,
};
