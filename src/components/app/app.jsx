import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import PropTypes from "prop-types";

const App = (props) => {
  const {filmNames} = props;

  return <WelcomeScreen
    filmNames={filmNames}
  />;
};

App.propTypes = {
  filmNames: PropTypes.array.isRequired,
};

export default App;
