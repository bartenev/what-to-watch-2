import {extend, FavoriteFilmAction, Genres} from "../../const";
import {SHOW_MORE_BUTTON_INITIAL_VALUE, SHOW_MORE_BUTTON_STEP} from "../../const";

const initialState = {
  genre: Genres.ALL_GENRES,
  films: [],
  numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
  comments: [],
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  RESET_FILTER: `RESET_FILTER`,
  INCREASE_NUMBER_OF_SHOWN_FILMS: `INCREASE_NUMBER_OF_SHOWN_FILMS`,
  SET_DEFAULT_NUMBER_OF_SHOWN_FILMS: `SET_DEFAULT_NUMBER_OF_SHOWN_FILMS`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SEND_COMMENT: `SEND_COMMENT`,
  RESET_COMMENTS: `RESET_COMMENTS`,
  ADD_FAVORITE_FILM: `ADD_FAVORITE_FILM`,
};

const filmAdapter = (film) => {
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

const commentAdapter = (data) => ({
  user: {
    id: data.user.id,
    name: data.user.name,
  },
  date: new Date(data.date),
  text: data.comment,
  rating: data.rating,
  id: data.id,
});

const Operations = {
  loadFilms: (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = response.data.map((film) => filmAdapter(film));
        dispatch(ActionCreator.loadFilms(films));
      });
  },

  loadComments: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const comments = response.data.map((comment) => commentAdapter(comment));
        dispatch(ActionCreator.loadComments(comments));
      });
  },

  sendComment: (comment, id) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: comment.text,
      rating: comment.rating,
    })
      .then(() => {
        history.back();
        // console.log(response);
        // dispatch(AppActionCreator.setLastScreenType());
      });
  },

  addFavoriteFilm: (id, action) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${id}/${action === FavoriteFilmAction.ADD ? 1 : 0}`)
      .catch((response) => {
        throw new Error(response);
      });
  },
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

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
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

  resetComments: () => ({
    type: ActionType.RESET_COMMENTS,
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

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.SEND_COMMENT:
      return extend(state, {
        // comments: action.payload,
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

    case ActionType.RESET_COMMENTS:
      return extend(state, {
        comments: [],
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operations};
