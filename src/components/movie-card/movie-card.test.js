import React from "react";
import renderer from "react-test-renderer";
import {MovieCard} from "./movie-card";
import {testFilms} from "../../mocks/testFilms";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ScreenType} from "../../reducer/app/app";
import {UserInfo} from "../../mocks/userInfo";

it(`Render MovieCard`, () => {
  const tree = renderer.create((
    <MovieCard
      film={testFilms[0]}
      onPlayClick={() => {}}
      authorizationStatus={AuthorizationStatus.AUTH}
      onUserBlockClick={() => {}}
      typeOfScreen={ScreenType.MAIN}
      userInfo={UserInfo}
    />
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
