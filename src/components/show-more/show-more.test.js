import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more";

it(`ShowMore is rendered correctly`, () => {
  const tree = renderer.create((
    <ShowMore
      onClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
