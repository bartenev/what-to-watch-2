import React from "react";
import MainScreen from "../main-screen/main-screen";
import PropTypes from "prop-types";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {films} = props;

  return <MainScreen
    films={films}
    onWelcomeButtonClick={welcomeButtonHandler}
  />;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.shape({
      poster: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      number: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      numberOfRatings: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

// {
//       title: filmName,
//       src: {
//         poster: `img/${filmName.toLowerCase().replace(/ /g, `-`)}.jpg`,
//         preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
//         video: ``,
//       },
//       previewSrc: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
//       director: getRandomElementOfArray(directors),
//       starring: getRandomArrayOfSomething(getRandomElementOfArray, 6, 1, directors),
//       reviews: getRandomArrayOfSomething(getReview, 6, 0),
//       runTime: getRandomNumber(300, 1),
//       genre: getRandomElementOfArray(genres),
//       released: getRandomNumber(2021, 1950),
//       description: getRandomText(),
//       rating: {
//         number: getRandomNumber(10, 0),
//         word: `Excellent`,
//         numberOfRatings: getRandomNumber(10000),
//       },
//     }

export default App;
