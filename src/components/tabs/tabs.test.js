import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs";

const film = {
  description: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  director: `Christopher Nolan`,
  genre: `Action`,
  rating: {
    score: 5,
    count: 783,
    level: `Excellent`,
  },
  released: 1956,
  reviews: [
    {
      date: new Date(),
      name: `Ivan`,
      rating: 8,
      text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
    },
    {
      date: new Date(),
      name: `Genka`,
      rating: 0,
      text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Quisque fringilla lacinia pulvinar. Donec vel semper nunc, ac posuere lorem. Nulla sed tortor nunc.. `,
    },
    {
      date: new Date(),
      name: `Cheba`,
      rating: 5,
      text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    },
    {
      date: new Date(),
      name: `Cheba`,
      rating: 5,
      text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Praesent in nisi condimentum, aliquet nisl at, fermentum neque. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
    }
  ],
  runTime: 240,
  src: {
    poster: `img/pulp-fiction.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    video: ``,
  },
  starring: [
    `Quentin Tarantino`,
    `David Fincher`,
  ],
  title: `Pulp Fiction`
};

it(`Tabs is rendered correctly`, () => {
  const tree = renderer.create((
    <Tabs
      film={film}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});