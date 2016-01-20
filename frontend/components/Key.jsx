var React = require('react'),
    Tones = require('../constants/Tones'),
    Note = require('../util/Note.js'),
    KeyStore = require('../stores/KeyStore');

var Key = React.createClass({
  getInitialState: function () {
    return { pressed: "" };
  },

  componentDidMount: function(){
    KeyStore.addListener(this.handleKey);
    this.note = new Note(Tones[this.props.noteName]);
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

    return (
      <div className={klass}>
        {this.props.noteName}
      </div>
    );
  }

});

module.exports = Key;
