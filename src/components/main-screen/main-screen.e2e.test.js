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
      picture: `picture-1`,
      previewSrc: `src-1`,
    },
    {
      title: `title-2`,
      picture: `picture-2`,
      previewSrc: `src-2`,
    },
    {
      title: `title-3`,
      picture: `picture-3`,
      previewSrc: `src-3`,
    },
    {
      title: `title-4`,
      picture: `picture-4`,
      previewSrc: `src-4`,
    },
    {
      title: `title-5`,
      picture: `picture-5`,
      previewSrc: `src-5`,
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
