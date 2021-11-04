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
    const {film, onHover, onClick} = this.props;
    const {title, src} = film;
    const {previewImage, previewVideo} = src;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          onHover(film);
          this.timerId = setTimeout(() => this.setState({isHovered: true}), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(this.timerId);
          this.setState({isHovered: false});
        }}
        onClick={(evt) => {
          evt.preventDefault();
          onClick(film);
        }}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={this.state.isHovered}
            isMuted={true}
            videoSrc={previewVideo}
            posterSrc={previewImage}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }
}

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
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
  }).isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
