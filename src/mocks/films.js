const getRandomNumber = (max, min = 0) => {
  return min + Math.round(Math.random() * (max - min));
};

const names = [`Vasya`, `Kolya`, `Ivan`, `Petr`, `Genka`, `Cheba`, `Ilya`, `Karina`];

const directors = [
  `Christopher Nolan`,
  `Steven Spielberg`,
  `Quentin Tarantino`,
  `Martin Scorsese`,
  `David Fincher`,
  `Ridley Scott`,
  `Stanley Kubrick`,
  `Robert Zemeckis`,
  `Francis Ford Coppola`,
  `Clint Eastwood`
];

const genres = [`Action`, `Comedy`, `Drama`, `Fantasy`, `Horror`, `Mystery`, `Romance`, `Thriller`];

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Praesent in nisi condimentum, aliquet nisl at, fermentum neque.
Vivamus ex urna, tincidunt eget feugiat a, luctus ut arcu.
Vivamus elementum nisl eu elit cursus, id luctus justo posuere.
Integer commodo enim eget ullamcorper faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Mauris interdum dolor a convallis pharetra. Fusce porttitor dictum mi, id tincidunt ligula lobortis eu.
Nunc sapien turpis, eleifend in odio at, ullamcorper efficitur lorem.
Quisque fringilla lacinia pulvinar. Donec vel semper nunc, ac posuere lorem. Nulla sed tortor nunc.`;

const textItems = text.split(`.\n`);

const getRandomText = () => {
  let randomText = ``;
  for (let i = 0; i < getRandomNumber(5, 1); i++) {
    randomText += textItems[getRandomNumber(textItems.length - 1)];
    randomText += `. `;
  }
  return randomText;
};

const getReview = () => {
  return {
    name: names[getRandomNumber(names.length - 1)],
    date: `${getRandomNumber(31, 1)}/${getRandomNumber(12, 1)}/2021`,
    text: getRandomText(),
    rating: getRandomNumber(10),
  };
};

const getRandomElementOfArray = (array) => {
  return array[getRandomNumber(array.length - 1)];
};

const getRandomArrayOfSomething = (getElement, max, min, array = []) => {
  const count = getRandomNumber(max, min);
  let randomArray = [];
  for (let i = 0; i < count; i++) {
    randomArray.push(getElement(array));
  }

  return randomArray;
};

const filmsNames = [`Pulp Fiction`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`, `We need to talk about Kevin`];

const getFilms = () => {
  return filmsNames.map((filmName) => {
    return ({
      title: filmName,
      src: {
        poster: `img/${filmName.toLowerCase().replace(/ /g, `-`)}.jpg`,
        preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
        video: ``,
      },
      previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
      director: getRandomElementOfArray(directors),
      starring: getRandomArrayOfSomething(getRandomElementOfArray, 6, 1, directors),
      reviews: getRandomArrayOfSomething(getReview, 6, 0),
      runTime: getRandomNumber(300, 1),
      genre: getRandomElementOfArray(genres),
      released: getRandomNumber(2021, 1950),
      description: getRandomText(),
      rating: {
        number: getRandomNumber(10, 0),
        word: `Excellent`,
        numberOfRatings: getRandomNumber(10000),
      },
    });
  });
};

const films = getFilms();

export default films;
