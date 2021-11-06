import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {MONTHS} from "../../const";
import {connect} from "react-redux";
import {ActionCreator, Operations} from "../../reducer/data/data";
import {getComments} from "../../reducer/data/selectors";

const getTwoDigitNumber = (number) => {
  return number < 10 ? `0${number}` : number;
};

const getReviews = (comments) => {
  return (
    comments.map((comment) => {
      const {user, date, text, rating, id} = comment;
      const {name} = user;
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const dateTime = `${year}-${getTwoDigitNumber(month + 1)}-${getTwoDigitNumber(day)}`;

      return (
        <div key={`${name}-${id}`} className="review">
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
  const {film, loadComments, comments, resetComments} = props;

  useEffect(() => {
    loadComments(film.id);

    return () => {
      resetComments();
    };
  }, []);

  const firstCol = Math.ceil(comments.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {getReviews(comments.slice(0, firstCol))}
      </div>

      <div className="movie-card__reviews-col">
        {getReviews(comments.slice(firstCol))}
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
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
  }).isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    date: PropTypes.instanceOf(Date),
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })),
  resetComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(Operations.loadComments(id));
  },
  resetComments() {
    dispatch(ActionCreator.resetComments());
  }
});

export {TabReviews};

export default connect(mapStateToProps, mapDispatchToProps)(TabReviews);
