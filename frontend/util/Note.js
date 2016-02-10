// util/Note.js
var ctx;

var createOscillator = function (freq) {
  var osc = this.props.ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createGainNode = function (ctx) {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(merger);
  return gainNode;
};

var Note = function (freq, channel, ctx) {
  this.oscillatorNode = createOscillator(freq);
  this.gainNode = createGainNode(ctx);
  this.oscillatorNode.connect(this.gainNode);
  ctx = ctx;
};

Note.prototype = {
  start: function () {
    // can't explain 0.3, it is a reasonable value
    this.gainNode.gain.value = 0.7;
  },

  stop: function () {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;
