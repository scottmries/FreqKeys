var AppDispatcher = require('../dispatcher/dispatcher');

var WaveformActions = {
  waveformChanged: function (waveform){
    AppDispatcher.dispatch({
      actionType: "waveformChanged",
      waveform: waveform
    });
  }
}

module.exports = WaveformActions;
