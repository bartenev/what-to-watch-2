import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";

const film = {
  title: `We need to talk about Kevin`,
  picture: `img/we-need-to-talk-about-kevin.jpg`,
  previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`SmallMovieCard is rendered correctly`, () => {
  const tree = renderer.create((
    <SmallMovieCard
      film={film}
      onHover={() => {}}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
