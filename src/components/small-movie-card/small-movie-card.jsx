import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, onHover} = props;
  const {title, picture} = film;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={onHover(film)}>
      <div className="small-movie-card__image">
        <img src={picture} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
