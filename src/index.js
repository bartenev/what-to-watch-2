import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const init = () => {
  const filmNames = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

  ReactDOM.render(
      <App
        filmNames={filmNames}
      />,
      document.querySelector(`#root`)
  );
};

init();
