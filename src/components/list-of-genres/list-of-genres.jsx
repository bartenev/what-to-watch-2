import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const ListOfGenres = (props) => {
  const {genres, genre: selectedGenre, onFilterClick} = props;
  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => (
          <li key={genre} className={`catalog__genres-item ${genre === selectedGenre ? `catalog__genres-item--active` : ``}`}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                if (genre !== selectedGenre) {
                  onFilterClick(genre);
                }
              }}
            >{genre}</a>
          </li>
        ))
      }
    </ul>
  );
};

ListOfGenres.propTypes = {
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});

export {ListOfGenres};

export default connect(mapStateToProps)(ListOfGenres);
