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
    const {previewSrc, posterSrc} = this.props;
    const video = this._videoRef.current;
    video.src = previewSrc;
    video.poster = posterSrc;
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
  previewSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
};
