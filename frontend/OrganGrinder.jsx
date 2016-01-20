var React = require('react'),
    ReactDOM = require('react-dom'),
    Key = require('./components/Key'),
    KeyListeners = require('./util/KeyListener'),
    Tones = require('./constants/Tones');

var OrganGrinder = React.createClass({
  componentDidMount: function(){
    KeyListeners.keyup();
    KeyListeners.keydown();
  },

  componentWillUnmount: function(){
    KeyListeners.keyoff();
  },

  render: function () {
    var keys = Object.keys(Tones).map(function (noteName) {
      return <Key key={noteName} noteName={noteName} />;
    });

    return(
      <div className="keys">
        {keys}
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<OrganGrinder />, document.getElementById('content'));
});
