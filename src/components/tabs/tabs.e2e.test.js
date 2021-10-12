import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs";
import {TabsType} from "../../const";

configure({
  adapter: new Adapter(),
});

const mock = {
  film: {
    description: `Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem. Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu. Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu. `,
    director: `Christopher Nolan`,
    genre: `Mystery`,
    rating: {
      score: 5,
      count: 783,
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
  }
};

const mockEvent = {
  preventDefault() {}
};

it(`Click on the tab-details should change the state to TabsType.DETAILS`, () => {
  const {film} = mock;

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
