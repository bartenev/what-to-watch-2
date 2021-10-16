import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import films from "./mocks/films";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducer";

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          films={films}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
