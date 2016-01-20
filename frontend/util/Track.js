var KeyActions = require('../actions/KeyActions'),
    KeyStore = require('../stores/KeyStore');

function Track(options) {
  this.name = options.name;
  this.roll = options.roll || [];
}

Track.prototype.updateName = function (name) {
  this.name = name;
};

Track.prototype.startRecording = function () {
  this.roll = [];
  this.start = Date.now();
};

Track.prototype.addNotes = function (notes) {
  this.roll.push({
    timeSlice: Date.now() - this.start,
    notes: notes
  });
};

Track.prototype.stopRecording = function () {
  this.addNotes([]);
};

Track.prototype.play = function () {
  if (this.interval) {
    return;
  }
  var playbackStartTime = Date.now();
  var currentNote = 0;
  var roll = this.roll;
  var that = this;

  this.interval = setInterval(function () {

    if (currentNote < roll.length) {
      var elapsedTime = (Date.now() - playbackStartTime);
      var noteNames = roll[currentNote].notes;

      if (elapsedTime > roll[currentNote].timeSlice) {
        KeyStore.all().forEach(function (noteName) {
          KeyActions.trackKeyReleased(noteName);
        });

        noteNames.forEach(function (noteName) {
          KeyActions.trackKeyPressed(noteName);
        });

        currentNote++;
      }

    } else {
      clearInterval(that.interval);
      that.interval = 0;
    }
  }, 10);

};

module.exports = Track;
