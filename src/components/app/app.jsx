import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import PropTypes from "prop-types";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {films} = props;

  return <WelcomeScreen
    films={films}
    onWelcomeButtonClick={welcomeButtonHandler}
  />;
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
