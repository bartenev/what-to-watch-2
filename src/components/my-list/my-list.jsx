import React from "react";
import FilmsList from "../films-list/films-list";
import Footer from "../footer/footer";
import Logo from "../logo/logo";
import UserBlock from "../user-block/user-block";
import PropTypes from "prop-types";

const MyList = (props) => {
  const {films, onLogoClick} = props;

  const favoriteFilms = films.filter((film) => film.isFavorite);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo onClick={onLogoClick} />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList
          films={favoriteFilms}
          onHover={() => {}}
          onClick={() => {}}
        />
      </section>

      <Footer />
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.array.isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

export default MyList;
