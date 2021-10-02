import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`Render WelcomeScreen`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      filmNames={[`1`, `2`, `3`, `4`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

