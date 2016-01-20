var React = require('react'),
    TrackStore = require('../stores/TrackStore'),
    TrackPlayer = require('../components/TrackPlayer');

var Jukebox = React.createClass({
  getInitialState: function(){
    return { tracks: TrackStore.all() };
  },

  componentDidMount: function(){
    TrackStore.addListener(this.handleTrackSaved);
  },

  componentWillUnmount: function () {
    TrackStore.remove(this.handleTrackSaved);
  },

  handleTrackSaved: function () {
    this.setState({ tracks: TrackStore.all() });
  },

  render: function(){
    var tracks = this.state.tracks.map(function (track) {
      return <TrackPlayer track={track} />;
    });

    return (
      <ul className="jukebox">
        {tracks}
      </ul>
    );
  }
});

module.exports = Jukebox;
