var React = require('react');

var WIDTH = 800;
var HEIGHT = 300;

function draw(analyser, canvasCtx, dataArray, color1, color2) {
  canvasCtx.fillStyle = "rgb(" + color1[0] + ", " + color1[1] + ", " + color1[2] + ")";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.lineWidth = 10;
  canvasCtx.strokeStyle = "rgb(" + color2[0] + ", " + color2[1] + ", " + color2[2] + ")";
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
    this.canvasCtx = this.canvasEl.getContext("2d");
    this.canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    draw(this.props.analyser,
      this.canvasCtx,
      this.props.dataArray,
      this.props.color1,
      this.props.color2
    );
  },

  componentWillReceiveProps: function () {
    // this.props.analyser.getByteTimeDomainData(this.props.dataArray);
    draw(this.props.analyser,
      this.canvasCtx,
      this.props.dataArray,
      this.props.color1,
      this.props.color2
    );
  },

  render: function () {
    return (
      <div className="absolute-position-behind">
        <canvas id="oscilloscope" width={WIDTH} height={HEIGHT}></canvas>
      </div>
    )
  }
});

module.exports = Oscilloscope;
