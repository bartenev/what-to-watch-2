import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import MovieCard from "../movie-card/movie-card";
import MovieCardFull from "../movie-card-full/movie-card-full";
import ListOfFilmsLikeThis from "../list-of-films-like-this/list-of-films-like-this";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import Player from "../player/player";

const Mode = {
  CLICK: `click`,
  HOVER: `hover`
};

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      film: null,
      mode: null,
      playing: false,
    };
  }

  render() {
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

  _getMovieCard(resetFilter, filteredFilms) {
    if (this.state.mode === Mode.CLICK) {
      return (
        <MovieCardFull
          film={this.state.film}
          onLogoClick={() => {
            resetFilter();
            this.setState({
              film: null,
              mode: null,
              playing: false,
            });
          }}
          onPlayClick={() => {
            this.setState({
              playing: true,
            });
          }}
        />
      );
    } // else if (true) {
    // const randFilm = filteredFilms[Math.floor(Math.random() * filteredFilms.length)];
    return (
      <MovieCard
        film={filteredFilms[0]}
        onPlayClick={() => {
          this.setState({
            playing: true,
          });
        }}
      />
    );
    // }

    // return null;
  }

  _getListOfFilms(films, filteredFilms) {
    if (this.state.mode === Mode.CLICK) {
      return (
        <ListOfFilmsLikeThis
          currentFilm={this.state.film}
          films={films}
          onHover={() => {}}
          onClick={(film) => {
            this.setState({
              // clickedFilm: film,
              film,
              // mode: Mode.CLICK,
            });
          }}
        />
      );
    }

    return (
      <ListOfFilms
        films={films}
        filteredFilms={filteredFilms}
        onHover={(film) => {
          this.setState({
            // hoveredFilm: film,
            // film,
            // mode: Mode.HOVER,
          });
        }}
        onClick={(film) => {
          this.setState({
            // clickedFilm: film,
            film,
            mode: Mode.CLICK,
          });
        }}
      />
    );
  }
}

MainScreen.propTypes = {
  filteredFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.shape({
      poster: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    src: PropTypes.shape({
      poster: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  resetFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetFilter() {
    dispatch(ActionCreator.resetFilter());
  }
});

export {MainScreen};

export default connect(null, mapDispatchToProps)(MainScreen);
