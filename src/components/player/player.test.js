import React from "react";
import renderer from "react-test-renderer";
import Player from "./player";

const film = {
  description: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu. Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. `,
  director: `Christopher Nolan`,
  genre: `Mystery`,
  rating: {
    score: 5,
    count: 783,
    level: `Excellent`,
  },
  released: 1966,
  reviews: [
    {
      date: new Date(),
      name: `Vasya`,
      rating: 4,
      text: `Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. `,
    },
  ],
  runTime: 220,
  src: {
    poster: `img/macbeth.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    video: ``,
  },
  starring: [
    `Robert Zemeckis`,
    `Christopher Nolan`,
    `Clint Eastwood`,
  ],
  title: `Macbeth`,
};

it(`Player is rendered correctly`, () => {
  const tree = renderer.create((
    <Player film={film} onCloseButtonClick={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
