import React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";

const getUserBlock = (authorizationStatus, userInfo, onUserBlockClick) => {
  if (authorizationStatus === AuthorizationStatus.AUTH) {
    const {avatar} = userInfo;
    return (
      <div className="user-block__avatar">
        <img
          src={avatar}
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

const MovieCard = (props) => {
  const {film, onPlayClick, authorizationStatus, onUserBlockClick, userInfo} = props;
  const {title, genre, released, src, isFavorite} = film;
  const {backgroundImage, poster} = src;

  const inListSvg = isFavorite ? `#in-list` : `#add`;
  const userBlock = getUserBlock(authorizationStatus, userInfo, onUserBlockClick);

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={title}/>
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
          {userBlock}
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={poster} alt={title} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">
              {title}
            </h2>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieCard.propTypes = {
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
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  onUserBlockClick: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export {MovieCard};

export default connect(mapStateToProps, null)(MovieCard);
