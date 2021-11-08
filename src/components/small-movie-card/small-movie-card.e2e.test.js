import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";
import {testFilms} from "../../mocks/testFilms";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

describe(`SmallMovieCard component`, () => {
  it(`Hover on film card should pass to the callback data-object from which this film was created`, () => {
    const film = testFilms[0];
    const onHover = jest.fn();
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          film={film}
          onHover={onHover}
          onClick={onClick}/>
    );

    smallMovieCard.simulate(`mouseEnter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover.mock.calls[0][0]).toMatchObject(film);
  });
  it(`Click on film card should pass to the callback data-object from which this film was created`, () => {
    const film = testFilms[0];
    const onHover = jest.fn();
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          film={film}
          onHover={onHover}
          onClick={onClick}/>
    );

    const card = smallMovieCard.find(`.small-movie-card`);
    card.simulate(`click`, mockEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toMatchObject(film);
  });
});
