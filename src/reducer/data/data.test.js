import {
  ActionCreator, ActionType,
  getFilmsOfSelectedGenre,
  reducer
} from "./data";
import {Genres, SHOW_MORE_BUTTON_INITIAL_VALUE, SHOW_MORE_BUTTON_STEP} from "../../const";
import films from "../../mocks/films";

const mockFilms = [
  {
    description: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    director: `Christopher Nolan`,
    genre: `Comedies`,
    rating: {
      score: 5,
      count: 783,
      level: `Excellent`,
    },
    released: 1956,
    reviews: [
      {
        date: new Date(),
        name: `Ivan`,
        rating: 8,
        text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
      },
      {
        date: new Date(),
        name: `Genka`,
        rating: 0,
        text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Quisque fringilla lacinia pulvinar. Donec vel semper nunc, ac posuere lorem. Nulla sed tortor nunc.. `,
      },
      {
        date: new Date(),
        name: `Cheba`,
        rating: 5,
        text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
      },
      {
        date: new Date(),
        name: `Cheba`,
        rating: 5,
        text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Praesent in nisi condimentum, aliquet nisl at, fermentum neque. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
      }
    ],
    runTime: 240,
    src: {
      poster: `img/pulp-fiction.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
      video: ``,
    },
    starring: [
      `Quentin Tarantino`,
      `David Fincher`,
    ],
    title: `Pulp Fiction`
  },
  {
    description: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu. Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. `,
    director: `Christopher Nolan`,
    genre: `Crime`,
    rating: {
      score: 0,
      count: 6354,
      level: `Excellent`,
    },
    released: 1966,
    reviews: [
      {
        date: new Date(),
        name: `Vasya`,
        rating: 4,
        text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
      },
    ],
    runTime: 220,
    src: {
      poster: `img/macbeth.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
      video: ``,
    },
    starring: [
      `Robert Zemeckis`,
      `Christopher Nolan`,
      `Clint Eastwood`,
    ],
    title: `Macbeth`,
  },
];

describe(`Business logic is correct`, () => {
  it(`Films filter worked is correctly`, () => {
    expect(getFilmsOfSelectedGenre(Genres.COMEDIES, mockFilms)).toEqual([mockFilms[0]]);
    expect(getFilmsOfSelectedGenre(Genres.CRIME, mockFilms)).toEqual([mockFilms[1]]);
    expect(getFilmsOfSelectedGenre(Genres.DRAMAS, mockFilms)).toEqual([]);
    expect(getFilmsOfSelectedGenre(Genres.ALL_GENRES, mockFilms)).toEqual(mockFilms);
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

  it(`Action creator for getting films returns correct action`, () => {
    expect(ActionCreator.getFilms()).toEqual({
      type: ActionType.GET_FILMS,
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
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should change current genre on a given value`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.DOCUMENTARY,
    })).toEqual({
      genre: Genres.DOCUMENTARY,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });

    expect(reducer({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.ALL_GENRES,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });

    expect(reducer({
      genre: Genres.COMEDIES,
      films,
      filteredFilms: films.filter((film) => film.genre === Genres.COMEDIES),
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `CHANGE_GENRE`,
      payload: Genres.ALL_GENRES,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films.filter((film) => film.genre === Genres.COMEDIES),
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should get selected films by genre`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `GET_FILMS`,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });

    expect(reducer({
      genre: Genres.COMEDIES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `GET_FILMS`,
    })).toEqual({
      genre: Genres.COMEDIES,
      films,
      filteredFilms: films.filter((film) => film.genre === Genres.COMEDIES),
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should increase number of shown films`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    }, {
      type: `INCREASE_NUMBER_OF_SHOWN_FILMS`,
      payload: SHOW_MORE_BUTTON_STEP,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE + SHOW_MORE_BUTTON_STEP,
    });
  });

  it(`Reducer should setting default number of shown films`, () => {
    expect(reducer({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: 123,
    }, {
      type: `SET_DEFAULT_NUMBER_OF_SHOWN_FILMS`,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });

  it(`Reducer should reset filter by default`, () => {
    expect(reducer({
      genre: Genres.COMEDIES,
      films,
      filteredFilms: films.filter((film) => film.genre === Genres.COMEDIES),
      numberOfShownFilms: 123,
    }, {
      type: `RESET_FILTER`,
    })).toEqual({
      genre: Genres.ALL_GENRES,
      films,
      filteredFilms: films,
      numberOfShownFilms: SHOW_MORE_BUTTON_INITIAL_VALUE,
    });
  });
});

