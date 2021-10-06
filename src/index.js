import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import films from "./mocks/films";

const init = () => {
  ReactDOM.render(
      <App
        films={films}
      />,
      document.querySelector(`#root`)
  );
};

init();
