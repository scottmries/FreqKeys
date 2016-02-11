var AppDispatcher = require('../dispatcher/dispatcher');

var ColorActions = {
  colorChanged: function (color){
    AppDispatcher.dispatch({
      actionType: "colorChanged",
      color: color
    });
  }
}

module.exports = ColorActions;
