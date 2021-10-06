import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

configure({
  adapter: new Adapter(),
});

const mock = {
  film: {
    title: `name`,
    picture: `pic`,
  }
};

it(`Hover on film card should pass to the callback data-object from which this film was created`, () => {
  const {film} = mock;
  const onHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        film={film}
        onHover={onHover}
      />
  );

  smallMovieCard.simulate(`mouseEnter`);

  expect(onHover).toHaveBeenCalledTimes(1);

  expect(onHover.mock.calls[0][0]).toMatchObject(film);
});
