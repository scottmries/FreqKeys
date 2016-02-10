var React = require('react');

function setup() {
  var canvasEl = document.getElementById("oscilloscope");
  var canvasCtx = canvasEl.getContext("2d");

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
}



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

var Oscilloscope = React.createClass({

  componentDidMount: function () {
    draw();
  },

  onload: function () {
    var canvasEl = document.getElementById("oscilloscope");
    var canvasCtx = canvasEl.getContext("2d");

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  },
  
  render: function () {
    return <canvas id="oscilloscope" width="816px" height="150px"></canvas>;
  }
});

module.exports = Oscilloscope;
