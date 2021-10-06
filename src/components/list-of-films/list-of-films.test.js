import React from "react";
import renderer from "react-test-renderer";
import ListOfFilms from "./list-of-films";

const films = [
  {
    title: `Fantastic Beasts`,
    picture: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
  },
  {
    title: `Bohemian Rhapsody`,
    picture: `img/bohemian-rhapsody.jpg`
  },
  {
    title: `Macbeth`,
    picture: `img/macbeth.jpg`
  },
  {
    title: `Aviator`,
    picture: `img/aviator.jpg`
  },
  {
    title: `We need to talk about Kevin`,
    picture: `img/we-need-to-talk-about-kevin.jpg`
  },
];

it(`ListOfFilms is rendered correctly`, () => {
  const tree = renderer.create(
      <ListOfFilms
        films={films}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
