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
      activeTab: TabsType.OVERVIEW,
    };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.film !== this.props.film) {
      this.setState({
        activeTab: TabsType.OVERVIEW,
      });
    }
  }

  render() {
    const {film} = this.props;
    const allTabs = Object.values(TabsType);

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {allTabs.map((tab) => {
              if (!film.reviews.length && tab === TabsType.REVIEWS) {
                return null;
              }

              return (
                <li key={tab} className={`movie-nav__item ${this.state.activeTab === tab ? `movie-nav__item--active` : ``}`}>
                  <a
                    href="#"
                    className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this.setState({
                        activeTab: tab
                      });
                    }}
                  >{tab}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        {this._getTab(film, this.state.activeTab)}
      </div>
    );
  }

  _getTab(film, activeTab) {
    switch (activeTab) {
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
