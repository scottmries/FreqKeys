var React = require('react'),
    Tones = require('../constants/Tones'),
    Note = require('../util/Note.js'),
    KeyStore = require('../stores/KeyStore');

var Key = React.createClass({

  componentDidMount: function(){
    KeyStore.addListener(this.handleKey);
    this.note = new Note(Tones[this.props.noteName]);
  },

  handleKey: function(){
    if (KeyStore.all().indexOf(this.props.noteName) !== -1){
      this.note.start();
    } else {
      this.note.stop();
    }
  },

  componentWillUnmount: function(){
    KeyStore.remove(this.handleKey);
  },

  render: function(){
    return (
      <div className="key">
        {this.props.noteName}

      </div>
    );
  }

});

module.exports = Key;
