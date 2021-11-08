import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in";

it(`SignIn is rendered correctly`, () => {
  const tree = renderer.create((

    <SignIn
      logIn={() => {}}
      onLogoClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

