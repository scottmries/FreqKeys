var React = require('react'),
    Track = require('../util/Track'),
    KeyStore = require('../stores/KeyStore'),
    TrackActions = require('../actions/TrackActions');

var Recorder = React.createClass({
  getInitialState: function () {
    return { isRecording: false, name: "", Track: new Track({ name: "" }) };
  },

  updateTrackName: function(e){
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  },

  componentDidMount: function () {
    KeyStore.addListener(this.handleRecorded);
  },

  componentWillUnmount: function () {
    keyStore.remove(this.handleRecorded);
  },

  handleRecorded: function () {
    var notes = KeyStore.all();
    if (this.state.isRecording) {
      this.state.Track.addNotes(notes);
    }
  },

  startOrStop: function () {
    var newIsRecording = !this.state.isRecording;
    this.setState({ isRecording: newIsRecording});

    if (newIsRecording){
      this.state.Track.startRecording();
    } else {
      this.state.Track.stopRecording();
      this.state.Track.updateName(this.state.name);
      TrackActions.trackSaved(this.state.Track);
      this.setState({ Track: new Track({ name: this.state.trackName })});
    }
  },

  render: function () {
    var content = this.state.isRecording ? "Stop" : "Start";
    return(
      <div className="recorder">
        <button id="recorder" onClick={this.startOrStop}>{content}</button>
        <input type="text" onChange={this.updateTrackName} value={this.state.name} placeholder="Name for your track"></input>
      </div>
    );
  }
});

module.exports = Recorder;
