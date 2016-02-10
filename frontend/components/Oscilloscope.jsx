var React = require('react');

var WIDTH = 816;
var HEIGHT = 150;

function draw(analyser, canvasCtx, dataArray) {

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";
  canvasCtx.beginPath();
  var bufferLength = analyser.frequencyBinCount;
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

  canvasCtx.lineTo(WIDTH, HEIGHT / 2);
  canvasCtx.stroke();
}

var Oscilloscope = React.createClass({

  componentDidMount: function () {
    this.canvasEl = document.getElementById("oscilloscope");
    var canvasCtx = this.canvasEl.getContext("2d");

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    draw(this.props.analyser, canvasCtx, this.props.dataArray);
  },

  componentWillReceiveProps: function () {
    console.log(this.props.dataArray);
    draw(this.props.analyser, canvasCtx, this.props.dataArray);
  },

  render: function () {
    return <canvas id="oscilloscope" width="816px" height="150px"></canvas>;
  }
});

module.exports = Oscilloscope;
