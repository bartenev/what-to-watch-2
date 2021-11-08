import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {testFilms} from "../../mocks/testFilms";

it(`VideoPlayer is rendered correctly`, () => {
  const {src} = testFilms[0];
  const {previewImage, previewVideo} = src;
  const tree = renderer.create((
    <VideoPlayer
      isPlaying={false}
      isMuted={false}
      videoSrc={previewVideo}
      posterSrc={previewImage}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
