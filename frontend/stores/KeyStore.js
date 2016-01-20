var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js');

var KeyStore = new Store(AppDispatcher);

var _downKeys = [];

function addKey(noteName) {
  if (typeof noteName !== 'undefined' && _downKeys.indexOf(noteName) === -1) {
    _downKeys.push(noteName);
    KeyStore.__emitChange();
  }
}

function removeKey(noteName) {
  var idx = _downKeys.indexOf(noteName);
  if (idx !== -1) {
    _downKeys.splice(idx, 1);
    KeyStore.__emitChange();
  }
}

KeyStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case "keyUp":
    removeKey(payload.noteName);
    break;
  case "keyDown":
    addKey(payload.noteName);
    break;
  }
};

KeyStore.all = function(){
  return _downKeys.slice();
};

module.exports = KeyStore;
