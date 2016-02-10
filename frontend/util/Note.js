// util/Note.js
var ctx;

var createOscillator = function (freq, ctx) {
  var osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

var createGainNode = function (ctx, channel, merger) {
  var gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(merger, 0, channel);
  return gainNode;
};

var Note = function (freq, channel, ctx, merger) {
  this.oscillatorNode = createOscillator(freq, ctx);
  this.gainNode = createGainNode(ctx, channel, merger);
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
