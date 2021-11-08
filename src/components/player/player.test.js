import React from "react";
import renderer from "react-test-renderer";
import Player from "./player";
import {testFilms} from "../../mocks/testFilms";

it(`Player is rendered correctly`, () => {
  const tree = renderer.create((
    <Player
      film={testFilms[0]}
      onCloseButtonClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
