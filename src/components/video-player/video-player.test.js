import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const film = {
  title: `Fantastic Beasts`,
  picture: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`VideoPlayer is rendered correctly`, () => {
  const {picture, previewSrc} = film;
  const tree = renderer.create((
    <VideoPlayer
      isPlaying={false}
      isMuted={false}
      previewSrc={previewSrc}
      posterSrc={picture}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
