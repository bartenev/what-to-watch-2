import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";
import ListOfGenres from "../list-of-genres/list-of-genres";
import {Genres} from "../../const";
import ShowMore from "../show-more/show-more";
import {ActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";
import {getNumberOfShownFilms} from "../../reducer/app/selectors";

class ListOfFilms extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, filteredFilms, numberOfShownFilms, increaseNumberOfShownFilms, onHover, onClick, onFilterClick} = this.props;

    let genres = [Genres.ALL_GENRES];
    films.forEach((film, i) => {
      if (films.findIndex((it) => it.genre === film.genre) === i) {
        genres.push(film.genre);
      }
    });

    const shownFilms = filteredFilms.slice(0, numberOfShownFilms);

    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ListOfGenres
          genres={genres}
          onFilterClick={onFilterClick}
        />

        <div className="catalog__movies-list">
          {
            shownFilms.map((film, i) => {
              const {title} = film;
              return (
                <SmallMovieCard
                  key={`${title}-${i}`}
                  film={film}
                  onHover={onHover}
                  onClick={onClick}
                />
              );
            })
          }
        </div>
        {
          this._getShowMoreButton(filteredFilms, numberOfShownFilms, increaseNumberOfShownFilms)
        }
      </section>
    );
  }

  _getShowMoreButton(filteredFilms, numberOfShownFilms, increaseNumberOfShownFilms) {
    if (filteredFilms.length > numberOfShownFilms) {
      return (
        <ShowMore
          onClick={(evt) => {
            evt.preventDefault();
            increaseNumberOfShownFilms();
          }}
        />
      );
    }

    return ``;
  }
}

ListOfFilms.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  filteredFilms: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  numberOfShownFilms: PropTypes.number.isRequired,
  increaseNumberOfShownFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfShownFilms: getNumberOfShownFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.setDefaultNumberOfShownFilms());
  },
  increaseNumberOfShownFilms() {
    dispatch(ActionCreator.increaseNumberOfShownFilms());
  }
});

export {ListOfFilms};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfFilms);
