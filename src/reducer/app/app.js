import {extend, Genres} from "../../const";
import {SHOW_MORE_BUTTON_INITIAL_VALUE, SHOW_MORE_BUTTON_STEP} from "../../const";

const initialState = {
  genre: Genres.ALL_GENRES,
  films: [],
  numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  RESET_FILTER: `RESET_FILTER`,
  INCREASE_NUMBER_OF_SHOWN_FILMS: `INCREASE_NUMBER_OF_SHOWN_FILMS`,
  SET_DEFAULT_NUMBER_OF_SHOWN_FILMS: `SET_DEFAULT_NUMBER_OF_SHOWN_FILMS`,
  LOAD_FILMS: `LOAD_FILMS`,
};

const adapter = (film) => {
  return ({
    id: film.id,
    title: film.name,
    src: {
      poster: film.poster_image,
      backgroundImage: film.background_image,
      previewImage: film.preview_image,
      previewVideo: film.preview_video_link,
      video: film.video_link,
    },
    director: film.director,
    starring: film.starring,
    reviews: [],
    runTime: film.run_time,
    genre: film.genre,
    released: film.released,
    description: film.description,
    rating: {
      score: film.rating,
      count: film.scores_count,
    },
    isFavorite: film.is_favorite,
    backgroundColor: film.background_color,
  });
};

const Operations = {
  loadFilms: (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = response.data.map((film) => adapter(film));
        dispatch(ActionCreator.loadFilms(films));
      });
  }
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
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

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
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
      return extend(state, {
        genre: initialState.genre,
        numberOfShownFilms: initialState.numberOfShownFilms,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
