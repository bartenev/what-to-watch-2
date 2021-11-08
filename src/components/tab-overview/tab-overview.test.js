import React from "react";
import renderer from "react-test-renderer";
import TabOverview from "./tab-overview";
import {testFilms} from "../../mocks/testFilms";

it(`TabOverview is rendered correctly`, () => {
  const tree = renderer.create((
    <TabOverview
      film={testFilms[0]}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
