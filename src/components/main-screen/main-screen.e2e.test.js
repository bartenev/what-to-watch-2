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
      title: `title-1`,
      picture: `picture-1`
    },
    {
      title: `title-`,
      picture: `picture-2`
    },
    {
      title: `title-`,
      picture: `picture-3`
    },
    {
      title: `title-`,
      picture: `picture-4`
    },
    {
      title: `title-`,
      picture: `picture-5`
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
