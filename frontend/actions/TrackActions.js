var AppDispatcher = require('../dispatcher/dispatcher');

var TrackActions = {
  trackSaved: function (track){
    AppDispatcher.dispatch({
      actionType: "trackSaved",
      track: track
    });
  },

  trackDeleted: function (track) {
    AppDispatcher.dispatch({
      actionType: "trackDeleted",
      track: track
    });
  }
};

module.exports = TrackActions;
