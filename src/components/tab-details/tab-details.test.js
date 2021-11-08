import React from "react";
import renderer from "react-test-renderer";
import TabDetails from "./tab-details";
import {testFilms} from "../../mocks/testFilms";

it(`TabDetails is rendered correctly`, () => {
  const tree = renderer.create((
    <TabDetails
      film={testFilms[0]}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
