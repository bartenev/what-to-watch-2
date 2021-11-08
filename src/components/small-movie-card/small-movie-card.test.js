import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";
import {testFilms} from "../../mocks/testFilms";

it(`SmallMovieCard is rendered correctly`, () => {
  const tree = renderer.create((
    <SmallMovieCard
      film={testFilms[0]}
      onHover={() => {}}
      onClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
