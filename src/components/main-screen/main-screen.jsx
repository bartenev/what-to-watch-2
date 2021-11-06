import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import ListOfFilmsLikeThis from "../list-of-films-like-this/list-of-films-like-this";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Operations, AuthorizationStatus} from "../../reducer/user/user";
import {ActionCreator as AppActionCreator, ScreenType} from "../../reducer/app/app";
import {connect} from "react-redux";
import Player from "../player/player";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import SignIn from "../sign-in/sign-in";
import MovieCard from "../movie-card/movie-card";
import {TypeOfMovieCardScreen} from "../movie-card/movie-card";
import {getFilm, getScreenType} from "../../reducer/app/selectors";

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._onLogoClick = this._onLogoClick.bind(this);
    this._onUserBlockClick = this._onUserBlockClick.bind(this);
    this._onPlayClick = this._onPlayClick.bind(this);
  }

  render() {
    const {films, filteredFilms, film, setFilm, screenType, setScreenType, setLastScreenType, checkAuth} = this.props;

    switch (screenType) {

      case ScreenType.AUTHORIZATION:
        return (
          <SignIn
            onLogoClick={this._onLogoClick}
          />
        );

      case ScreenType.PLAYER:
        return (
          <Player
            film={film}
            onCloseButtonClick={() => {
              setLastScreenType();
            }}
          />
        );

      case ScreenType.ADD_REVIEW:
        return (
          <MovieCard
            typeOfScreen={TypeOfMovieCardScreen.REVIEW}
            film={film}
            onLogoClick={this._onLogoClick}
            onUserBlockClick={this._onUserBlockClick}
            onFilmClick={() => {
              setLastScreenType();
            }}
          />
        );
    }

    const movieCard = this._getMovieCard();
    const listOfFilms = this._getListOfFilms(films, filteredFilms);

    return (
      <Fragment>
        {movieCard}
        <div className="page-content">
          {listOfFilms}
          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }

  _onLogoClick() {
    const {resetFilter, films, setScreenType, setFilm} = this.props;
    resetFilter();
    setFilm(films[0]);
    setScreenType(ScreenType.MAIN);
  }

  _onUserBlockClick() {
    const {setScreenType} = this.props;
    setScreenType(ScreenType.AUTHORIZATION);
  }

  _onPlayClick() {
    const {setScreenType} = this.props;
    setScreenType(ScreenType.PLAYER);
  }

  _getMovieCard() {
    const {screenType, film, setScreenType} = this.props;
    if (screenType === ScreenType.FILM_PAGE) {
      return (
        <MovieCard
          typeOfScreen={TypeOfMovieCardScreen.FULL}
          film={film}
          onLogoClick={this._onLogoClick}
          onPlayClick={this._onPlayClick}
          onUserBlockClick={this._onUserBlockClick}
          onAddReviewClick={() => {
            setScreenType(ScreenType.ADD_REVIEW);
          }}
        />
      );
    } else {
      return (
        <MovieCard
          typeOfScreen={TypeOfMovieCardScreen.MAIN}
          film={film}
          onPlayClick={this._onPlayClick}
          onUserBlockClick={this._onUserBlockClick}
        />
      );
    }
  }

  _getListOfFilms(films, filteredFilms) {
    const {screenType, setScreenType, film, setFilm} = this.props;

    if (screenType === ScreenType.FILM_PAGE) {
      return (
        <ListOfFilmsLikeThis
          currentFilm={film}
          films={films}
          onHover={() => {}}
          onClick={(newFilm) => {
            setFilm(newFilm);
            setScreenType(ScreenType.FILM_PAGE);
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
          setFilm(newFilm);
          setScreenType(ScreenType.FILM_PAGE);
        }}
      />
    );
  }
}

MainScreen.propTypes = {
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
  film: PropTypes.object,
  screenType: PropTypes.oneOf(Object.values(ScreenType)),
  resetFilter: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  setScreenType: PropTypes.func.isRequired,
  setLastScreenType: PropTypes.func.isRequired,
  setFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  film: getFilm(state),
  screenType: getScreenType(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFilter() {
    dispatch(DataActionCreator.resetFilter());
  },
  checkAuth() {
    dispatch(Operations.checkAuth());
  },
  setScreenType(screenType) {
    dispatch(AppActionCreator.setScreenType(screenType));
  },
  setLastScreenType() {
    dispatch(AppActionCreator.setLastScreenType());
  },
  setFilm(film) {
    dispatch(AppActionCreator.setFilm(film));
  }
});

export {MainScreen};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
