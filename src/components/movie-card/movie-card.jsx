import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {film, onWelcomeButtonClick} = props;
  const {title, genre, released, src} = film;
  const {poster} = src;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={poster} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={poster} alt={title} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2
              className="movie-card__title"
              onClick={onWelcomeButtonClick}>
              {title}
            </h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
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
  }).isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
};

export default MovieCard;
