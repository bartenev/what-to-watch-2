import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
// import {createStore} from "redux";
// import {reducer} from "../../reducer/data/data";
// import {Provider} from "react-redux";
import {testFilms} from "../../mocks/testFilms";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ScreenType} from "../../reducer/app/app";

it(`Render App`, () => {
  // const store = createStore(reducer);

  const tree = renderer.create((
    // <Provider store={store}>
    <App
      films={testFilms}
      filteredFilms={testFilms}
      authorizationStatus={AuthorizationStatus.AUTH}
      checkAuth={() => {}}
      resetFilter={() => {}}
      screenType={ScreenType.MAIN}
      setFilm={() => {}}
      setLastScreenType={() => {}}
      setScreenType={() => {}}/>
    // </Provider>
  ), {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

