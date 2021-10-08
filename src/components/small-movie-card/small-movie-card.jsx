import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
    };
  }


  render() {
    const {film, onHover} = this.props;
    const {title, picture, previewSrc} = film;

    let timer;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          onHover(film);
          timer = setTimeout(() => this.setState({isHovered: true}), 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(timer);
          this.setState({isHovered: false});
        }}>
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={this.state.isHovered}
            isMuted={true}
            previewSrc={previewSrc}
            posterSrc={picture}
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
    picture: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
