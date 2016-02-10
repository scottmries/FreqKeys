var React = require('react'),
    ReactDOM = require('react-dom'),
    Key = require('./components/Key'),
    KeyListeners = require('./util/KeyListener'),
    Tones = require('./constants/Tones'),
    Recorder = require('./components/Recorder'),
    Jukebox = require('./components/Jukebox'),
    Waveform = require('./util/Waveform'),
    Oscilloscope = require('./components/Oscilloscope'),
    Tuner = require('./components/Tuner'),
    ctx = new (window.AudioContext || window.webkitAudioContext)(),
    analyser = ctx.createAnalyser(),
    merger = ctx.createChannelMerger(13),
    gainNode = ctx.createGain(),
    bufferLength = analyser.frequencyBinCount,
    dataArray = new Uint8Array(bufferLength),
    TuningStore = require('./stores/TuningStore');

analyser.getByteTimeDomainData(dataArray);
merger.connect(analyser);
analyser.connect(ctx.destination);
analyser.fftSize = 2048;


var draw = function () {
  drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
};

draw();

var OrganGrinder = React.createClass({
  getInitialState: function(){
    return { trackName: "", tuning: "equal" };
  },

  componentDidMount: function(){
    this.tuningListener = TuningStore.addListener(this.changeTuning);
  },

  componentWillUnmount: function() {
    this.tuningListener.remove();
  },

  changeTuning: function() {
    this.setState( {tuning: TuningStore.getTuning() });
    console.log(this.state);
  },

  addKeyListeners: function () {
    KeyListeners.keyup();
    KeyListeners.keydown();
  },

  removeKeyListeners: function () {
    KeyListeners.keyoff();
  },


  render: function () {
    var tuning = this.state.tuning;
    // console.log("OrganGrinder state tuning", Tones[tuning]);
    var keys = Object.getOwnPropertyNames(Tones[tuning]).map(function (noteName, idx) {
      return <Key key={noteName} noteName={noteName} tuning={Tones[tuning]} channel={idx} ctx={ctx} merger={merger}/>;
    });

    return(
      <div>
        <Tuner change={this.changeTuning} val={this.state.tuning}/>
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
