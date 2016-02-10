var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    TuningStore = new Store(AppDispatcher),
    _tuning = "";

TuningStore.setTuning = function(tuning) {
  _tuning = tuning;
  TuningStore.__emitChange();
};

TuningStore.getTuning = function () {
  return _tuning + "";
};

TuningStore.__onDispatch = function (payload){
  switch(payload.actionType){
    case "tuningChanged":
      this.setTuning(payload.tuning);
      break;
  }
};

module.exports = TuningStore;
