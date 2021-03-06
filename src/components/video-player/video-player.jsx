import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {videoSrc, posterSrc} = this.props;
    const video = this._videoRef.current;
    video.src = videoSrc;
    video.poster = posterSrc;

    if (this.props.isPlaying) {
      video.play();
    }
  }

  render() {
    const {isMuted} = this.props;
    return (
      <video
        className="player__video"
        ref={this._videoRef}
        muted={isMuted}
      />
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.poster = ``;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
};
