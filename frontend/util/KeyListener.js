var KeyActions = require('../actions/KeyActions');

var KeyListeners = {

  keyup: function(e){
    $(document).on("keyup", function(e){
      KeyActions.keyReleased(e.keyCode);
    });
  },

  keydown: function(e){
    $(document).on("keydown", function(e){
      KeyActions.keyPressed(e.keyCode);
    });
  },

  keyoff: function () {
    $(document).off("keyup");
    $(document).off("keydown");
  }
};

module.exports = KeyListeners;
