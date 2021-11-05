import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs";
import {AuthorizationStatus, Operations} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {MovieCard} from "../movie-card/movie-card";

const getUserBlock = (authorizationStatus, onUserBlockClick) => {
  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <div className="user-block__avatar">
        <img
          src="img/avatar.jpg"
          alt="User avatar"
          width="63"
          height="63"
          onClick={(evt) => {
            evt.preventDefault();
            onUserBlockClick();
          }}
        />
      </div>
    );
  } else {
    return (
      <a
        href="sign-in.html"
        className="user-block__link"
        onClick={(evt) => {
          evt.preventDefault();
          onUserBlockClick();
        }}
      >Sign in</a>
    );
  }
};

const MovieCardFull = (props) => {
  const {film, onLogoClick, onPlayClick, authorizationStatus, onUserBlockClick} = props;
  const {title, genre, released, src, backgroundColor, isFavorite} = film;
  const {poster, backgroundImage} = src;

  const inListSvg = isFavorite ? `#in-list` : `#add`;
  const userBlock = getUserBlock(authorizationStatus, onUserBlockClick);

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor}}>
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a
              href="main.html"
              className="logo__link"
              onClick={(evt) => {
                evt.preventDefault();
                onLogoClick();
              }}
            >
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            {userBlock}
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={(evt) => {
                  evt.preventDefault();
                  onPlayClick();
                }}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref={inListSvg}></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt={title} width="218"
              height="327"/>
          </div>
          <Tabs
            film={film}
          />
        </div>
      </div>
    </section>
  );
};

MovieCardFull.propTypes = {
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
  onLogoClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  onUserBlockClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {MovieCardFull};

export default connect(mapStateToProps, null)(MovieCardFull);

