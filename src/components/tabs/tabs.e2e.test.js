import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs";
import {TabsType} from "../../const";
import {testFilms} from "../../mocks/testFilms";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

it(`Click on the tab-details should change the state to TabsType.DETAILS`, () => {
  const film = testFilms[0];

  const tabs = shallow(
      <Tabs
        film={film}
      />
  );

  const tabDetails = tabs.find(`.movie-nav__link`).at(1);
  expect(tabs.state(`activeTab`)).toBe(TabsType.OVERVIEW);

  tabDetails.simulate(`click`, mockEvent);
  expect(tabs.state(`activeTab`)).toBe(TabsType.DETAILS);
});
