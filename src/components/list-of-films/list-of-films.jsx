import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

class ListOfFilms extends PureComponent {
  constructor(props) {
    super(props);

    this.state = ({activeCard: null});
  }

  render() {
    const {films, onHover} = this.props;
    return films.map((film, i) => {
      const {title} = film;
      return (
        <SmallMovieCard
          key={`${title}-${i}`}
          film={film}
          onHover={onHover}
        />);
    });
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
      number: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      numberOfRatings: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  onHover: PropTypes.func.isRequired,
};

export default ListOfFilms;
