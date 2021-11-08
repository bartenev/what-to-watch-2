import React from "react";
import renderer from "react-test-renderer";
import {testFilms} from "../../mocks/testFilms";
import {AddReview} from "./add-review";

it(`AddReview is rendered correctly`, () => {
  const tree = renderer.create((

    <AddReview
      sendComment={() => {}}
      film={testFilms[0]}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

