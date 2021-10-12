import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import MovieCard from "../movie-card/movie-card";
import MovieCardFull from "../movie-card-full/movie-card-full";
import ListOfFilmsLikeThis from "../list-of-films-like-this/list-of-films-like-this";

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoveredFilm: null,
      clickedFilm: null,
    };
  }

  render() {
    const {films, onWelcomeButtonClick} = this.props;
    const movieCard = this._getMovieCard(films, onWelcomeButtonClick);
    const listOfFilms = this._getListOfFilms(films);
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

  _getMovieCard(films, onWelcomeButtonClick) {
    if (this.state.clickedFilm) {
      return (
        <MovieCardFull
          film={this.state.clickedFilm}
          onLogoClick={() => {
            this.setState({
              hoveredFilm: null,
              clickedFilm: null,
            });
          }}
        />
      );
    } else if (this.state.hoveredFilm) {
      return (
        <MovieCard
          film={this.state.hoveredFilm}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    return null;
  }

  _getListOfFilms(films) {
    if (this.state.clickedFilm) {
      return (
        <ListOfFilmsLikeThis
          currentFilm={this.state.clickedFilm}
          films={films}
          onHover={() => {}}
          onClick={(film) => {
            this.setState({
              clickedFilm: film,
            });
          }}
        />
      );
    }

    return (
      <ListOfFilms
        films={films}
        onHover={(film) => {
          this.setState({
            hoveredFilm: film,
          });
        }}
        onClick={(film) => {
          this.setState({
            clickedFilm: film,
          });
        }}
      />
    );
  }
}

MainScreen.propTypes = {
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
  onWelcomeButtonClick: PropTypes.func.isRequired,
};

export default MainScreen;
