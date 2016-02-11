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
    WaveformSelector = require('./components/WaveformSelector'),
    WaveformStore = require('./stores/WaveformStore');
    ctx = new (window.AudioContext || window.webkitAudioContext)(),
    analyser = ctx.createAnalyser(),
    merger = ctx.createChannelMerger(13),
    gainNode = ctx.createGain(),
    bufferLength = analyser.frequencyBinCount,
    dataArray = new Uint8Array(bufferLength),
    TuningStore = require('./stores/TuningStore'),
    ColorStore = require('./stores/ColorStore'),
    ColorActions = require('./actions/ColorActions'),
    Color = require('./util/Color');

analyser.getByteTimeDomainData(dataArray);
merger.connect(analyser);
analyser.connect(ctx.destination);
analyser.fftSize = 2048;

var OrganGrinder = React.createClass({
  getInitialState: function(){
    return { trackName: "", tuning: "equal", dataArray: [], color: new Color([255, 255, 255]), waveform: "triangle" };
  },

  draw: function () {
    analyser.getByteTimeDomainData(dataArray);
    this.setState({ dataArray: dataArray });
    var data = this.state.dataArray;
    // var color = new Color([(2 * data[0]) % 256, (3 * data[data.length/4]) % 256, (5* data[data.length/2]) % 256]);
    var color = new Color([ (data[0] * 10) % 255, (data[data.length/4] * 13) % 256, (data[data.length/2] * 17) % 256]);
    ColorActions.colorChanged(color);
    drawVisual = requestAnimationFrame(this.draw);
    // var color = new Color([0, 128, 256]);
  },

  componentDidMount: function(){
    this.tuningListener = TuningStore.addListener(this.changeTuning);
    this.colorListener = ColorStore.addListener(this.changeColor);
    this.waveformListener = WaveformStore.addListener(this.changeWaveform);
    this.draw();
  },

  componentWillUnmount: function() {
    this.tuningListener.remove();
    this.colorListener.remove();
    this.waveformListener.remove();
  },

  changeTuning: function() {
    this.setState( {tuning: TuningStore.getTuning() });
  },

  changeColor: function() {
    this.setState( {color: ColorStore.getColor() });
  },

  changeWaveform: function () {
    this.setState( {waveform: WaveformStore.waveform() });
  },

  addKeyListeners: function () {
    KeyListeners.keyup();
    KeyListeners.keydown();
  },

  removeKeyListeners: function () {
    KeyListeners.keyoff();
  },


  render: function () {
    var color1 = this.state.color.color.value;
    var color2 = this.state.color.splitComplements[0];
    var color3 = this.state.color.splitComplements[1];
    var data = this.state.dataArray;
    var tuning = this.state.tuning;
    var waveform = this.state.waveform;
    var keys = Object.getOwnPropertyNames(Tones[tuning]).map(function (noteName, idx) {
      return <Key key={noteName} noteName={noteName} tuning={Tones[tuning]} channel={idx} ctx={ctx} merger={merger} waveform={waveform}/>;
    });

    return(
      <div className="content">
        <div className="controls group">
          <Tuner change={this.changeTuning} val={this.state.tuning}/>
          <WaveformSelector />
        </div>
        <div tabIndex="0" onFocus={this.addKeyListeners} onBlur={this.removeKeyListeners} className="keys group">
          {keys}
          <Oscilloscope
            analyser={analyser}
            dataArray={this.state.dataArray}
            color1 = {color1}
            color2 = {color3}
            />
          <Recorder />
        </div>

        <Jukebox />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<OrganGrinder />, document.getElementById('content'));
});
