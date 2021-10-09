import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ListOfFilms from "../list-of-films/list-of-films";
import MovieCard from "../movie-card/movie-card";

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilm: null,
    };
  }

  render() {
    const {films, onWelcomeButtonClick} = this.props;
    const movieCard = this._getMovieCard(films, onWelcomeButtonClick);

    return (
      <div>
        {movieCard}
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <ul className="catalog__genres-list">
              <li className="catalog__genres-item catalog__genres-item--active">
                <a href="#" className="catalog__genres-link">All genres</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Comedies</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Crime</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Documentary</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Dramas</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Horror</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Kids & Family</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Romance</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Sci-Fi</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Thrillers</a>
              </li>
            </ul>

            <div className="catalog__movies-list">
              <ListOfFilms
                films={films}
                onHover={(film) => {
                  this.setState({
                    activeFilm: film,
                  });
                }}
              />
            </div>

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

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
      </div>
    );
  }

  _getMovieCard(films, onWelcomeButtonClick) {
    if (this.state.activeFilm) {
      return (
        <MovieCard
          film={this.state.activeFilm}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    return null;
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
      number: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      numberOfRatings: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
};

export default MainScreen;
