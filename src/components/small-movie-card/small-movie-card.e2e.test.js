import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({
  adapter: new Adapter(),
});

const mock = {
  film: {
    description: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu. Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. `,
    director: `Christopher Nolan`,
    genre: `Mystery`,
    rating: {
      score: 5,
      count: 783,
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
  }
};

const mockEvent = {
  preventDefault() {}
};

describe(`SmallMovieCard component`, () => {
  it(`Hover on film card should pass to the callback data-object from which this film was created`, () => {
    const {film} = mock;
    const onHover = jest.fn();
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          film={film}
          onHover={onHover}
          onClick={onClick}/>
    );

    smallMovieCard.simulate(`mouseEnter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover.mock.calls[0][0]).toMatchObject(film);
  });
  it(`Click on film card should pass to the callback data-object from which this film was created`, () => {
    const {film} = mock;
    const onHover = jest.fn();
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          film={film}
          onHover={onHover}
          onClick={onClick}/>
    );

    const card = smallMovieCard.find(`.small-movie-card`);
    card.simulate(`click`, mockEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toMatchObject(film);
  });
});
