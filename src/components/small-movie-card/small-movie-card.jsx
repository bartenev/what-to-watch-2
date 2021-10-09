import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
    };

    this.timerId = null;
  }


  render() {
    const {film, onHover} = this.props;
    const {title, src} = film;
    const {poster, preview} = src;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          onHover(film);
          this.timerId = setTimeout(() => this.setState({isHovered: true}), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this.timerId);
          this.setState({isHovered: false});
        }}>
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={this.state.isHovered}
            isMuted={true}
            previewSrc={preview}
            posterSrc={poster}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
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
  }).isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
