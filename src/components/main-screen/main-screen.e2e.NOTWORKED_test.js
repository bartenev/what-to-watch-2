import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainScreen from "./main-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  films: [
    {
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
    },
    {
      description: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu. Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. `,
      director: `Christopher Nolan`,
      genre: `Mystery`,
      rating: {
        score: 0,
        count: 6354,
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
    },
  ],
};

it(`Should welcome button be pressed`, () => {
  const {films} = mock;
  const onWelcomeButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <MainScreen
        films={films}
        onWelcomeButtonClick={onWelcomeButtonClick}
      />
  );

  const welcomeButton = welcomeScreen.find(`.movie-card__desc .movie-card__title`);

  welcomeButton.props().onClick();

  expect(onWelcomeButtonClick.mock.calls.length).toBe(1);
});