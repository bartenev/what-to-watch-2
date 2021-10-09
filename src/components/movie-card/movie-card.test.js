import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card";

const film = {
  description: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  director: `Christopher Nolan`,
  genre: `Action`,
  rating: {
    number: 5,
    numberOfRatings: 783,
    word: `Excellent`,
  },
  released: 1956,
  reviews: [
    {
      date: `23/1/2021`,
      name: `Ivan`,
      rating: 8,
      text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Vivamus elementum nisl eu elit cursus, id luctus justo posuere. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
    },
    {
      date: `13/3/2021`,
      name: `Genka`,
      rating: 0,
      text: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Quisque fringilla lacinia pulvinar. Donec vel semper nunc, ac posuere lorem. Nulla sed tortor nunc.. `,
    },
    {
      date: `17/6/2021`,
      name: `Cheba`,
      rating: 5,
      text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    },
    {
      date: `28/6/2021`,
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

it(`Render App`, () => {
  const tree = renderer.create((
    <MovieCard
      film={film}
      onWelcomeButtonClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
