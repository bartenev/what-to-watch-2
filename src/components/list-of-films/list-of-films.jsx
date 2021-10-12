import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

class ListOfFilms extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onHover, onClick} = this.props;
    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Comedies</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Crime</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Documentary</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Dramas</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Horror</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Kids & Family</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Romance</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Sci-Fi</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Thrillers</a>
          </li>
        </ul>
        <div className="catalog__movies-list">
          {
            films.map((film, i) => {
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
        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>
    );
  }
}

ListOfFilms.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
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

export default ListOfFilms;
