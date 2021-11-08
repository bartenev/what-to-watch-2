import React from "react";
import renderer from "react-test-renderer";
import {TabReviews} from "./tab-reviews";
import {testFilms} from "../../mocks/testFilms";

const comments = [
  {
    user: {
      id: 6,
      name: `Nikita`,
    },
    date: new Date(),
    text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
    rating: 8,
    id: 5,
  },
  {
    user: {
      id: 8,
      name: `Denis`,
    },
    date: new Date(),
    text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Quisque fringilla lacinia pulvinar. Donec vel semper nunc, ac posuere lorem. Nulla sed tortor nunc.. `,
    rating: 3,
    id: 2,
  },
];

it(`TabReviews is rendered correctly`, () => {
  const tree = renderer.create((
    <TabReviews
      film={testFilms[0]}
      loadComments={() => {}}
      resetComments={() => {}}
      comments={comments}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
