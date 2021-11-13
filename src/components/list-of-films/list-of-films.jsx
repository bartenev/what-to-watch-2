import React from "react";
import PropTypes from "prop-types";
import ListOfGenres from "../list-of-genres/list-of-genres";
import {Genres} from "../../const";
import ShowMore from "../show-more/show-more";
import {ActionCreator} from "../../reducer/data/data";
import {connect} from "react-redux";
import {getNumberOfShownFilms} from "../../reducer/data/selectors";
import FilmsList from "../films-list/films-list";

const ListOfFilms = (props) => {

  const {films, filteredFilms, numberOfShownFilms, increaseNumberOfShownFilms, onHover, onClick, onFilterClick} = props;

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

      <FilmsList
        films={shownFilms}
        onHover={onHover}
        onClick={onClick}
      />

      {
        filteredFilms.length > numberOfShownFilms
          ?
          <ShowMore
            onClick={(evt) => {
              evt.preventDefault();
              increaseNumberOfShownFilms();
            }}
          />
          : ``
      }
    </section>
  );
};

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
