var React = require('react');

var TrackPlayer = React.createClass({
  handleTrackPlay: function () {
    this.props.track.play();
  },

  render: function(){
    return (
      <li key={(Date.now() * Math.floor(Math.random() * 9999))}>
        {this.props.track.name}
        <button id="play-track" onClick={this.handleTrackPlay}>Play</button>
      </li>
    );
  }
});

module.exports = TrackPlayer;
