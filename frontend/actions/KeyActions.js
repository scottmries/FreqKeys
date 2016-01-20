var AppDispatcher = require('../dispatcher/dispatcher'),
    Mapping = require('../constants/Mapping');

var KeyActions = {
  keyPressed: function (keyCode){
    AppDispatcher.dispatch({
      actionType: "keyDown",
      noteName: Mapping[keyCode]
    });
  },

  keyReleased: function (keyCode){
    AppDispatcher.dispatch({
      actionType: "keyUp",
      noteName: Mapping[keyCode]
    });
  }
};

module.exports = KeyActions;
