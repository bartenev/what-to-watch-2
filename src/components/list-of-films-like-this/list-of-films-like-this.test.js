import React from "react";
import renderer from "react-test-renderer";
import ListOfFilmsLikeThis from "./list-of-films-like-this";
import {testFilms} from "../../mocks/testFilms";

it(`ListOfFilmsLikeThis is rendered correctly`, () => {
  const tree = renderer.create((
    <ListOfFilmsLikeThis
      currentFilm={testFilms[0]}
      films={testFilms}
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
