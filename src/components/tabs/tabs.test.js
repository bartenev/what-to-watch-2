import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs";
import {testFilms} from "../../mocks/testFilms";

it(`Tabs is rendered correctly`, () => {
  const tree = renderer.create((
    <Tabs
      film={testFilms[0]}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
