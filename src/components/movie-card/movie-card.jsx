import React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import Tabs from "../tabs/tabs";
import AddReview from "../add-review/add-review";
import {ScreenType} from "../../reducer/app/app";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

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
          onClick={onUserBlockClick}
        />
      </div>
    );
  } else {
    return (
      <Link
        to={AppRoute.LOGIN}
        // href="sign-in.html"
        className="user-block__link"
        // onClick={onUserBlockClick}
      >Sign in</Link>
    );
  }
};

const getLogoBlock = (onLogoClick) => {
  return (
    <div className="logo">
      <Link
        to={AppRoute.ROOT}
        className="logo__link"
        onClick={onLogoClick}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

const MovieCard = (props) => {
  const {
    typeOfScreen,
    film,
    authorizationStatus,
    userInfo,
    onLogoClick,
    onPlayClick,
    onAddReviewClick,
    onUserBlockClick,
    onFilmClick,
  } = props;

  const {title, genre, released, src, isFavorite, backgroundColor} = film;
  const {backgroundImage, poster} = src;

  const inListSvg = isFavorite ? `#in-list` : `#add`;

  const userBlock = getUserBlock(authorizationStatus, userInfo, onUserBlockClick);

  switch (typeOfScreen) {

    case ScreenType.MAIN:
      return (
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            {getLogoBlock(() => {})}

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
                  <Link
                    to={`${AppRoute.FILMS}/${film.id}${AppRoute.PLAYER}`}
                    className="btn btn--play movie-card__button"
                    // type="button"
                    onClick={onPlayClick}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
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

    case ScreenType.FILM_PAGE:
      return (
        <section className="movie-card movie-card--full" style={{backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={title}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              {getLogoBlock(onLogoClick)}
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
                  <Link
                    className="btn btn--play movie-card__button"
                    to={`${AppRoute.FILMS}/${film.id}${AppRoute.PLAYER}`}
                    // type="button"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onPlayClick();
                    }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={inListSvg}></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  {
                    authorizationStatus === AuthorizationStatus.AUTH ?
                      <a
                        href="add-review.html"
                        className="btn movie-card__button"
                        onClick={(evt) => {
                          evt.preventDefault();
                          onAddReviewClick();
                        }}
                      >Add review</a>
                      : null
                  }
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

    case ScreenType.ADD_REVIEW:
      return (
        <section className="movie-card movie-card--full" style={{backgroundColor}}>
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={title}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">

              {getLogoBlock(onLogoClick)}

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a
                      href="movie-page.html"
                      className="breadcrumbs__link"
                      onClick={(evt) => {
                        evt.preventDefault();
                        onFilmClick();
                      }}
                    >{title}</a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <div className="user-block">
                {userBlock}
              </div>
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img src={poster} alt={title} width="218"
                height="327"/>
            </div>
          </div>

          <AddReview
            film={film}
          />

        </section>
      );
  }

  return null;
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
  typeOfScreen: PropTypes.oneOf([ScreenType.FILM_PAGE, ScreenType.MAIN, ScreenType.ADD_REVIEW]).isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  userInfo: PropTypes.object.isRequired,
  onPlayClick: PropTypes.func,
  onLogoClick: PropTypes.func,
  onUserBlockClick: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func,
  onFilmClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export {MovieCard};

export default connect(mapStateToProps, null)(MovieCard);
