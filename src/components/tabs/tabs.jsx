import React, {PureComponent} from "react";
import {TabsType} from "../../const";
import PropTypes from "prop-types";
import TabOverview from "../tab-overview/tab-overview";
import TabDetails from "../tab-details/tab-details";
import TabReviews from "../tab-reviews/tab-reviews";

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TabsType.OVERVIEW,
      currentFilm: null,
    };
  }

  render() {
    const {film} = this.props;
    const allTabs = Object.values(TabsType);

    // if (this.state.currentFilm === null || this.state.currentFilm !== film) {
    //   this.setState({
    //     currentTab: TabsType.OVERVIEW,
    //     currentFilm: film,
    //   });
    // }

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {allTabs.map((tab) => {
              return (
                <li key={tab} className={`movie-nav__item ${this.state.currentTab === tab ? `movie-nav__item--active` : ``}`}>
                  <a
                    href="#"
                    className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.setState({
                        currentTab: tab
                      });
                    }}
                  >{tab}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        {this._getTab(film)}
      </div>
    );
  }

  _getTab(film) {
    switch (this.state.currentTab) {
      case TabsType.OVERVIEW: return (
        <TabOverview
          film={film}
        />
      );

      case TabsType.DETAILS: return (
        <TabDetails
          film={film}
        />
      );

      case TabsType.REVIEWS: return (
        <TabReviews
          film={film}
        />
      );
    }

    return null;
  }
}

Tabs.propTypes = {
  film: PropTypes.shape({
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
};
