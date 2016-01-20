var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js');

var TrackStore = new Store(AppDispatcher);
var _tracks = [];

TrackStore.all = function () {
  return _tracks.slice();
};

function saveTrack(track) {
  _tracks.push(track);
  TrackStore.__emitChange();
}

function deleteTrack(track) {

}

TrackStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case "trackSaved":
    saveTrack(payload.track);
    break;
  case "trackDeleted":
    deleteTrack(payload.track);
    break;
  }
};

module.exports = TrackStore;
