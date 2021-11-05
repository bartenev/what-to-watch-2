import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import MovieCard from "../movie-card/movie-card";
import MovieCardFull from "../movie-card-full/movie-card-full";
import ListOfFilmsLikeThis from "../list-of-films-like-this/list-of-films-like-this";
import {ActionCreator} from "../../reducer/app/app";
import {ActionCreator as ActionCreatorUser, Operations} from "../../reducer/user/user";
import {connect} from "react-redux";
import Player from "../player/player";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import SignIn from "../sign-in/sign-in";

const ScreenType = {
  FULL_FILM_CARD: `FULL_FILM_CARD`,
  AUTHORIZATION: `AUTHORIZATION`,
};

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: props.films[0],
      type: null,
      lastType: null,
      playing: false,
    };
  }

  render() {
    const {authorizationStatus, checkAuth} = this.props;

    checkAuth();

    if (this.state.type === ScreenType.AUTHORIZATION ||
      authorizationStatus === AuthorizationStatus.NO_AUTH
    ) {
      return (
        <SignIn
          onCloseButtonClick={() => {
            this.setState({
              type: this.state.lastType,
              lastType: null,
            });
          }}
        />
      );
    }

    if (this.state.playing) {
      return (
        <Player
          film={this.state.film}
          onCloseButtonClick={() => {
            this.setState({
              playing: false,
            });
          }}
        />
      );
    } else {
      const {films, filteredFilms, resetFilter} = this.props;
      const movieCard = this._getMovieCard(resetFilter, filteredFilms);
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
  }

  _getMovieCard(resetFilter, films) {
    if (this.state.type === ScreenType.FULL_FILM_CARD) {
      return (
        <MovieCardFull
          film={this.state.film}
          onLogoClick={() => {
            resetFilter();
            this.setState({
              film: films[0],
              type: null,
              playing: false,
            });
          }}
          onPlayClick={() => {
            this.setState({
              playing: true,
            });
          }}
          onUserBlockClick={() => {
            this.setState({
              lastType: this.state.type,
              type: ScreenType.AUTHORIZATION,
            });
          }}
        />
      );
    } else {
      return (
        <MovieCard
          film={this.state.film}
          onPlayClick={() => {
            this.setState({
              playing: true,
            });
          }}
          onUserBlockClick={() => {
            this.setState({
              lastType: this.state.type,
              type: ScreenType.AUTHORIZATION,
            });
          }}
        />
      );
    }
  }

  _getListOfFilms(films, filteredFilms) {
    if (this.state.type === ScreenType.FULL_FILM_CARD) {
      return (
        <ListOfFilmsLikeThis
          currentFilm={this.state.film}
          films={films}
          onHover={() => {}}
          onClick={(film) => {
            this.setState({
              film,
            });
          }}
        />
      );
    }

    return (
      <ListOfFilms
        films={films}
        filteredFilms={filteredFilms}
        onHover={ () => {}}
        onClick={(film) => {
          this.setState({
            film,
            type: ScreenType.FULL_FILM_CARD,
          });
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
  resetFilter: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetFilter() {
    dispatch(ActionCreator.resetFilter());
  },
  checkAuth() {
    dispatch(Operations.checkAuth());
  },
});

export {MainScreen};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
