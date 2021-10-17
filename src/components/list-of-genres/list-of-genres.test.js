import React from "react";
import renderer from "react-test-renderer";
import {ListOfGenres} from "./list-of-genres";
import {Genres} from "../../const";

it(`ListOfGenres is rendered correctly`, () => {
  const tree = renderer.create((
    <ListOfGenres
      genre={Genres.ALL_GENRES}
      genres={[Genres.ALL_GENRES, Genres.COMEDIES]}
      onFilterClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
