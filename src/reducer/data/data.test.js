import {
  ActionCreator, ActionType,
  reducer
} from "./data";
import {Genres, SHOW_MORE_BUTTON_INITIAL_VALUE, SHOW_MORE_BUTTON_STEP} from "../../const";
import {testFilms} from "../../mocks/testFilms";

const films = testFilms;

const getFilmsOfSelectedGenre = (genre, movies) => {
  return movies.filter((movie) => {
    if (genre === Genres.ALL_GENRES) {
      return true;
    }

    return movie.genre === genre;
  });
};

describe(`Business logic is correct`, () => {
  it(`Films filter worked is correctly`, () => {
    expect(getFilmsOfSelectedGenre(Genres.COMEDIES, films)).toEqual([films[0]]);
    expect(getFilmsOfSelectedGenre(Genres.CRIME, films)).toEqual([films[1]]);
    expect(getFilmsOfSelectedGenre(Genres.DRAMAS, films)).toEqual([]);
    expect(getFilmsOfSelectedGenre(Genres.ALL_GENRES, films)).toEqual(films);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(Genres.HORROR)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.HORROR,
    });
    expect(ActionCreator.changeGenre(Genres.ALL_GENRES)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: Genres.ALL_GENRES,
    });
  });

  it(`Action creator for increase number of shown films returns correct action`, () => {
    expect(ActionCreator.increaseNumberOfShownFilms()).toEqual({
      type: ActionType.INCREASE_NUMBER_OF_SHOWN_FILMS,
      payload: SHOW_MORE_BUTTON_STEP,
    });
  });

  it(`Action creator for setting default number of shown films returns correct action`, () => {
    expect(ActionCreator.setDefaultNumberOfShownFilms()).toEqual({
      type: ActionType.SET_DEFAULT_NUMBER_OF_SHOWN_FILMS,
    });
  });

  it(`Action creator reset filter returns correct action`, () => {
    expect(ActionCreator.resetFilter()).toEqual({
      type: ActionType.RESET_FILTER,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      genre: Genres.ALL_GENRES,
      films: [],
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should change current genre on a given value`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.DOCUMENTARY,
    })).toEqual({
      genre: Genres.DOCUMENTARY,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });

    expect(reducer({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.ALL_GENRES,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });

    expect(reducer({
      genre: Genres.COMEDIES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.ALL_GENRES,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should increase number of shown films`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `INCREASE_NUMBER_OF_SHOWN_FILMS`,
      payload: SHOW_MORE_BUTTON_STEP,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE + SHOW_MORE_BUTTON_STEP,
    });
  });

  it(`Reducer should setting default number of shown films`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: 123,
    }, {
      type: `SET_DEFAULT_NUMBER_OF_SHOWN_FILMS`,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should reset filter by default`, () => {
    expect(reducer({
      genre: Genres.COMEDIES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: 123,
    }, {
      type: `RESET_FILTER`,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films: testFilms,
      comments: [],
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });
});

