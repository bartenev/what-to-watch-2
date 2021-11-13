import React, {Fragment} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import ListOfFilmsLikeThis from "../list-of-films-like-this/list-of-films-like-this";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Operations, AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import Player from "../player/player";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import SignIn from "../sign-in/sign-in";
import MovieCard from "../movie-card/movie-card";
import {getFilm, getFilms, getFilteredFilms} from "../../reducer/data/selectors";
import {Switch, Route} from "react-router-dom";
import {AppRoute, ScreenType} from "../../const";
import Footer from "../footer/footer";
import MyList from "../my-list/my-list";

const getListOfFilms = (props, screenType) => {
  const {films, filteredFilms, getFilmById} = props;

  if (screenType === ScreenType.FILM_PAGE) {
    const id = Number(props.match.params.id);
    const film = getFilmById(id);

    return (
      <ListOfFilmsLikeThis
        currentFilm={film}
        films={films}
        onHover={() => {}}
        onClick={(newFilm) => {
          // setFilm(newFilm);
          // setScreenType(ScreenType.FILM_PAGE);
        }}
      />
    );
  }

  return (
    <ListOfFilms
      films={films}
      filteredFilms={filteredFilms}
      onHover={ () => {}}
      onClick={(newFilm) => {
        // setFilm(newFilm);
        // setScreenType(ScreenType.FILM_PAGE);
      }}
    />
  );
};

const getScreen = (props, screenType) => {
  const {films, getFilmById, resetFilter} = props;

  const listOfFilms = getListOfFilms(props, screenType);

  let film = films[0];
  if (screenType !== ScreenType.MAIN) {
    const id = Number(props.match.params.id);
    film = getFilmById(id);
  }

  switch (screenType) {
    case ScreenType.ADD_REVIEW:
      return (
        <MovieCard
          typeOfScreen={ScreenType.ADD_REVIEW}
          film={film}
          onLogoClick={resetFilter}
          onUserBlockClick={() => {
            // setScreenType(ScreenType.AUTHORIZATION);
          }}
          onFilmClick={() => {
            // setLastScreenType();
          }}
        />
      );

    case ScreenType.PLAYER:
      return (
        <Player
          film={film}
          onCloseButtonClick={() => {
            // setLastScreenType();
          }}
        />
      );
  }

  return (
    <Fragment>
      <MovieCard
        typeOfScreen={screenType}
        film={film}
        onLogoClick={resetFilter}
        onPlayClick={() => {
          // setScreenType(ScreenType.PLAYER);
        }}
        onUserBlockClick={() => {
          // setScreenType(ScreenType.AUTHORIZATION);
        }}
        onAddReviewClick={() => {
          // setScreenType(ScreenType.ADD_REVIEW);
        }}
      />
      <div className="page-content">
        {listOfFilms}

        <Footer />
      </div>
    </Fragment>
  );
};

// const getFilmTTT = () => {
//
// };

const App = (props) => {
  const {films, resetFilter} = props;

  if (!films.length) {
    return null;
  }

  // if (screenType === ScreenType.ADD_REVIEW && authorizationStatus === AuthorizationStatus.NO_AUTH) {
  //   setScreenType(ScreenType.AUTHORIZATION);
  // }

  return (
    <Switch>
      <Route path={AppRoute.ROOT} exact render={() => getScreen(props, ScreenType.MAIN)} />
      <Route path={`${AppRoute.FILMS}/:id`} exact
        render={(moreProps) => getScreen(Object.assign({}, props, moreProps), ScreenType.FILM_PAGE)}
      />
      <Route path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`} exact
        render={(moreProps) => getScreen(Object.assign({}, props, moreProps), ScreenType.PLAYER)}
      />
      <Route path={`${AppRoute.FILMS}/:id${AppRoute.ADD_REVIEW}`} exact
        render={(moreProps) => getScreen(Object.assign({}, props, moreProps), ScreenType.ADD_REVIEW)}
      />
      <Route path={AppRoute.LOGIN} exact
        render={() => (
          <SignIn
            onLogoClick={resetFilter}
          />
        )}
      />
      <Route path={AppRoute.MY_LIST} exact
        render={() => (
          <MyList films={films} onLogoClick={resetFilter} />
        )}
      />

    </Switch>
  );
};

App.propTypes = {
  filteredFilms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.shape({
      poster: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  })).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.shape({
      poster: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })),
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  })).isRequired,
  // film: PropTypes.object,
  // screenType: PropTypes.oneOf(Object.values(ScreenType)).isRequired,
  resetFilter: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  // setScreenType: PropTypes.func.isRequired,
  // setLastScreenType: PropTypes.func.isRequired,
  // setFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  films: getFilms(state),
  filteredFilms: getFilteredFilms(state),
  getFilmById: getFilm(state),
  // film: getFilm(state),
  // screenType: getScreenType(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFilter() {
    dispatch(DataActionCreator.resetFilter());
  },
  checkAuth() {
    dispatch(Operations.checkAuth());
  },
  // setScreenType(screenType) {
  //   dispatch(AppActionCreator.setScreenType(screenType));
  // },
  // setLastScreenType() {
  //   dispatch(AppActionCreator.setLastScreenType());
  // },
  // setFilm(film) {
  //   dispatch(AppActionCreator.setFilm(film));
  // },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
