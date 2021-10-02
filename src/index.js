import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const init = () => {
  const films = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

  ReactDOM.render(
      <App
        films={films}
      />,
      document.querySelector(`#root`)
  );
};

init();
