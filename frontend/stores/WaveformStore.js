var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    WaveformStore = new Store(AppDispatcher),
    _waveform = "triangle";

WaveformStore.setWaveform = function (waveform) {
  _waveform = waveform;
  WaveformStore.__emitChange();
};

WaveformStore.waveform = function () {
  return _waveform + "";
};

WaveformStore.__onDispatch = function (payload){
  switch(payload.actionType){
    case "waveformChanged":
      WaveformStore.setWaveform(payload.waveform);
      break;
  }
};

module.exports = WaveformStore;
