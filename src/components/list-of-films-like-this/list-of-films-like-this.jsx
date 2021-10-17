import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

class ListOfFilmsLikeThis extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {filteredFilms, onHover, onClick, currentFilm} = this.props;
    const relatedFilms = filteredFilms.filter((film) => film !== currentFilm).slice(0, 4);

    if (!relatedFilms.length) {
      return null;
    }

    return (
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {
            relatedFilms.map((film, i) => {
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
      </section>
    );
  }
}

ListOfFilmsLikeThis.propTypes = {
  currentFilm: PropTypes.shape({
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
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  filteredFilms: PropTypes.arrayOf(PropTypes.shape({
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
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListOfFilmsLikeThis;
