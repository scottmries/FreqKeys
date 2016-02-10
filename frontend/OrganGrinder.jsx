var React = require('react'),
    ReactDOM = require('react-dom'),
    Key = require('./components/Key'),
    KeyListeners = require('./util/KeyListener'),
    Tones = require('./constants/Tones'),
    Recorder = require('./components/Recorder'),
    Jukebox = require('./components/Jukebox');
    Waveform = require('./util/Waveform');
    Oscilloscope = require('./components/Oscilloscope');
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    merger = ctx.createChannelMerger(13);
    gainNode = ctx.createGain();
merger.connect(analyser);
analyser.connect(ctx.destination);
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.fftSize = 2048;

var OrganGrinder = React.createClass({
  getInitialState: function(){
    return { trackName: "" };
  },

  addKeyListeners: function () {
    KeyListeners.keyup();
    KeyListeners.keydown();
  },

  removeKeyListeners: function () {
    KeyListeners.keyoff();
  },


  render: function () {
    var keys = Object.keys(Tones).map(function (noteName, idx) {
      return <Key key={noteName} noteName={noteName} channel={idx} ctx={ctx} merger={merger}/>;
    });

    return(
      <div>
        <div tabIndex="0" onFocus={this.addKeyListeners} onBlur={this.removeKeyListeners} className="keys group">
          {keys}
          <Recorder />
        </div>

        <Jukebox />
        <Oscilloscope analyser={analyser} dataArray={dataArray}/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<OrganGrinder />, document.getElementById('content'));
});
