import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: false,
      progress: null,
    };
  }

  componentDidMount() {
    const {film} = this.props;
    const {src} = film;
    const {poster: posterSrc, video: videoSrc} = src;
    const video = this._videoRef.current;
    video.src = videoSrc;
    video.poster = posterSrc;

    if (this.state.isPlaying) {
      video.play();
    }

    video.oncanplaythrough = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.ontimeupdate = () => {
      this.setState({
        progress: video.currentTime
      });
    };
  }

  render() {
    const {film, onCloseButtonClick} = this.props;
    const {title, runTime} = film;
    const video = this._videoRef.current;

    const playButtonSvg = this.state.isPlaying ? `#pause` : `#play-s`;

    const restOfTimeInSeconds = video ? Math.floor(video.duration - video.currentTime) : runTime * 60;
    const hours = Math.floor(restOfTimeInSeconds / 60 / 60);
    const minutes = Math.floor(restOfTimeInSeconds / 60) - (hours * 60);
    const seconds = Math.floor(restOfTimeInSeconds) - (hours * 60 * 60) - (minutes * 60);
    const restOfTimeString = `${hours}:${minutes}:${seconds}`;

    const percent = video ? video.currentTime / video.duration * 100 : 0;

    return (
      <div className="player">
        <video
          className="player__video"
          ref={this._videoRef}
        />

        <Link
          to={`${AppRoute.FILMS}/${film.id}`}
          // type="button"
          className="player__exit"
          onClick={(evt) => {
            // evt.preventDefault();
            // onCloseButtonClick();
          }}
        >Exit</Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={percent} max="100"/>
              <div className="player__toggler" style={{left: `${percent}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{restOfTimeString}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={() => {
                this.setState({
                  isPlaying: !this.state.isPlaying,
                });
              }}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={playButtonSvg}/>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{title}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={(evt) => {
                evt.preventDefault();
                const videoElement = document.querySelector(`.player__video`);
                videoElement.requestFullscreen({navigationUI: `hide`}).catch((err) => {
                  throw Error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
              }}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.poster = ``;
    video.ontimeupdate = null;
  }
}

Player.propTypes = {
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
  onCloseButtonClick: PropTypes.func.isRequired,
};

export default Player;
