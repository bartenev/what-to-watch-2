import React from "react";
import renderer from "react-test-renderer";
import {ListOfFilms} from "./list-of-films";
import {testFilms} from "../../mocks/testFilms";

it(`ListOfFilms is rendered correctly`, () => {
  const tree = renderer.create((
    <ListOfFilms
      films={testFilms}
      filteredFilms={testFilms}
      onHover={() => {}}
      onClick={() => {}}
      increaseNumberOfShownFilms={() => {}}
      numberOfShownFilms={4}
      onFilterClick={() => {}}
    />

  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
