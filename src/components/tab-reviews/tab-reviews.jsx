import React from "react";
import PropTypes from "prop-types";
import {MONTHS} from "../../const";

const getTwoDigitNumber = (number) => {
  return number < 10 ? `0${number}` : number;
};

const getReviews = (reviews) => {
  return (
    reviews.map((review, i) => {
      const {name, date, text, rating} = review;
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const dateTime = `${year}-${getTwoDigitNumber(month + 1)}-${getTwoDigitNumber(day)}`;

      return (
        <div key={`${name}-${i}`} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{text}</p>

            <footer className="review__details">
              <cite className="review__author">{name}</cite>
              <time className="review__date" dateTime={dateTime}>{`${MONTHS[month]} ${day}, ${year}`}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{rating}</div>
        </div>
      );
    }));
};

const TabReviews = (props) => {
  const {film} = props;
  const {reviews} = film;

  const firstCol = Math.ceil(reviews.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {getReviews(reviews.slice(0, firstCol))}
      </div>

      <div className="movie-card__reviews-col">
        {getReviews(reviews.slice(firstCol))}
      </div>
    </div>
  );
};

TabReviews.propTypes = {
  film: PropTypes.shape({
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
  }).isRequired,
};

export default TabReviews;
