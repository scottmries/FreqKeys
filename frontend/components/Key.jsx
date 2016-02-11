var React = require('react'),
    Tones = require('../constants/Tones'),
    Note = require('../util/Note.js'),
    KeyStore = require('../stores/KeyStore'),
    Mapping = require('../constants/Mapping');


var Key = React.createClass({
  getInitialState: function () {
    return { pressed: "", tuning: "equal" };
  },

  componentDidMount: function(){
    this.keyListener = KeyStore.addListener(this.handleKey);
    this.note = new Note(this.props.tuning[this.props.noteName], this.props.channel, this.props.ctx, this.props.merger);
  },

  componentWillUnmount: function () {
    this.keyListener.remove();
  },

  componentWillReceiveProps: function () {
    this.note.setFrequency(this.props.tuning[this.props.noteName]);
    this.note.setWaveform(this.props.waveform);
  },

  handleKey: function(){
    if (KeyStore.all().indexOf(this.props.noteName) !== -1){
      this.note.start();
      this.setState({ pressed: "pressed" });
    } else {
      this.note.stop();
      this.setState({ pressed: "" });
    }
  },

  componentWillUnmount: function(){
    KeyStore.remove(this.handleKey);
  },

  render: function(){
    var klass = "key " + this.props.noteName + " " + this.state.pressed;
    var controlKey;
    for (var prop in Mapping){
      if (Mapping.hasOwnProperty(prop)){
        if (Mapping[prop] === this.props.noteName){
          controlKey = String.fromCharCode(prop);
        }
      }
    }
    return (
      <div className={klass}>
        {controlKey}
      </div>
    );
  }

});

module.exports = Key;
