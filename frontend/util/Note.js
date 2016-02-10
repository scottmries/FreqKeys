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
  console.log(gainNode);
  gainNode.gain.value = 0;
  gainNode.connect(merger, 0, channel % 2);
  gainNode.connect(merger, 0, (channel + 1) % 2 );
  return gainNode;
};

var Note = function (freq, channel, ctx, merger) {
  this.oscillatorNode = createOscillator(freq, ctx);
  // this.oscillatorNode.connect(merger, 0, channel);
  this.gainNode = createGainNode(ctx, channel, merger);
  this.oscillatorNode.connect(this.gainNode);
  this.gainNode.connect(merger, 0, channel % 2);
  console.log(this.oscillatorNode);
  ctx = ctx;
};

Note.prototype = {
  start: function () {
    this.gainNode.gain.value = 0.7;
  },

  stop: function () {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;
