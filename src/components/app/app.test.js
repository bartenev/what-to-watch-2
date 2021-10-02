import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmNames={[`1`, `2`, `3`, `4`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

