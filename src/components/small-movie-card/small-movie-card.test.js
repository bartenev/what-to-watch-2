import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";

const film = {
  title: `Fantastic Beasts`,
  picture: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`SmallMovieCard is rendered correctly`, () => {
  const tree = renderer.create(
      <SmallMovieCard
        film={film}
        onHover={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
