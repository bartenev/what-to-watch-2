import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import PropTypes from "prop-types";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {filmNames} = props;

  return <WelcomeScreen
    filmNames={filmNames}
    onWelcomeButtonClick={welcomeButtonHandler}
  />;
};

App.propTypes = {
  filmNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
