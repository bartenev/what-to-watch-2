import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.APP;

export const getFilm = (state) => {
  return state[NAME_SPACE].film;
};

export const getScreenType = (state) => {
  return state[NAME_SPACE].screenType;
};


