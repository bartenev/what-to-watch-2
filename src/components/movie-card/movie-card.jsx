import React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import Tabs from "../tabs/tabs";
import AddReview from "../add-review/add-review";
import {Link} from "react-router-dom";
import {AppRoute, FavoriteFilmAction, ScreenType} from "../../const";
import Logo from "../logo/logo";
import UserBlock from "../user-block/user-block";
import {Operations} from "../../reducer/data/data";

const MovieCard = (props) => {
  const {
    typeOfScreen,
    film,
    authorizationStatus,
    onLogoClick,
    onPlayClick,
    onAddReviewClick,
    onFilmClick,
    addFavoriteFilm,
  } = props;

  const {title, genre, released, src, isFavorite, backgroundColor} = film;
  const {backgroundImage, poster} = src;

  const inListSvg = isFavorite ? `#in-list` : `#add`;

  switch (typeOfScreen) {

    case ScreenType.MAIN:
      return (
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <Logo onClick={() => {}} />
            <UserBlock />
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
                    onClick={onPlayClick}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => {
                      const action = isFavorite ? FavoriteFilmAction.DELETE : FavoriteFilmAction.ADD;
                      addFavoriteFilm(film.id, action);
                    }}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={inListSvg}/>
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
              <Logo onClick={onLogoClick} />
              <UserBlock />
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
                      // evt.preventDefault();
                      // onPlayClick();
                    }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => {
                      const action = isFavorite ? FavoriteFilmAction.DELETE : FavoriteFilmAction.ADD;
                      addFavoriteFilm(film.id, action);
                    }}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref={inListSvg}/>
                    </svg>
                    <span>My list</span>
                  </button>
                  {
                    authorizationStatus === AuthorizationStatus.AUTH ?
                      <Link
                        to={`${AppRoute.FILMS}/${film.id}${AppRoute.ADD_REVIEW}`}
                        className="btn movie-card__button"
                        onClick={(evt) => {
                          // evt.preventDefault();
                          // onAddReviewClick();
                        }}
                      >Add review</Link>
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

              <Logo onClick={onLogoClick} />

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link
                      to={`${AppRoute.FILMS}/${film.id}`}
                      className="breadcrumbs__link"
                      onClick={(evt) => {
                        // evt.preventDefault();
                        // onFilmClick();
                      }}
                    >{title}</Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <UserBlock />

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
  onPlayClick: PropTypes.func,
  onLogoClick: PropTypes.func,
  onAddReviewClick: PropTypes.func,
  onFilmClick: PropTypes.func,
  addFavoriteFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addFavoriteFilm(id, action) {
    dispatch(Operations.addFavoriteFilm(id, action));
    dispatch(Operations.loadFilms);
  },
});

export {MovieCard};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
