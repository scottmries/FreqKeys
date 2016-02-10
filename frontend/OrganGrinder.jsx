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
debugger
  var analyser = ctx.createAnalyser();
  var merger = ctx.createChannelMerger(13);
  var gainNode = ctx.createGain();
  console.log("ctx", ctx);
  merger.connect(analyser);
  analyser.connect(ctx.destination);


  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var canvasEl = document.getElementById("oscilloscope");
  var canvasCtx = canvasEl.getContext("2d");

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";
    canvasCtx.beginPath();
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++){
      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0){
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }

  draw();


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
      return <Key key={noteName} noteName={noteName} channel={idx} ctx={ctx}/>;
    });

    return(
      <div>
        <div tabIndex="0" onFocus={this.addKeyListeners} onBlur={this.removeKeyListeners} className="keys group">
          {keys}
          <Recorder />
        </div>

        <Jukebox />
        <Oscilloscope analyser={analyser}/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<OrganGrinder />, document.getElementById('content'));
});
