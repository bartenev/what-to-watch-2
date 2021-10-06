import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

class ListOfFilms extends PureComponent {
  constructor(props) {
    super(props);

    this.state = ({activeCard: null});
  }

  render() {
    const {films} = this.props;
    return films.map((film, i) => {
      const {title} = film;
      return (
        <SmallMovieCard
          key={`${title}-${i}`}
          film={film}
          onHover={() => {

          }}
        />);
    });
  }
}

ListOfFilms.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListOfFilms;
