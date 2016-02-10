var AppDispatcher = require('../dispatcher/dispatcher');

var TuningActions = {
  tuningChanged: function (tuning){
    AppDispatcher.dispatch({
      actionType: "tuningChanged",
      tuning: tuning
    });
  }
};

module.exports = TuningActions;
