import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {Operations as DataOperations} from "./reducer/data/data";
import {Operations as UserOperations} from "./reducer/user/user";
import reducer from "./reducer";
import {createApi} from "./api";
import {compose} from "recompose";
import thunk from "redux-thunk";
import App from "./components/app/app";
import {Router} from "react-router-dom";
import history from "./history";

const init = () => {

  const api = createApi((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(DataOperations.loadFilms);
  store.dispatch(UserOperations.checkAuth());

  ReactDOM.render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
      document.querySelector(`#root`)
  );
};

init();
