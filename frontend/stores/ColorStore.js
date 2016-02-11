var Store = require('flux/utils').Store,
    Color = require('../util/color'),
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ColorStore = new Store(AppDispatcher),
    _color = {
      color: new Color([0, 128, 256])
    };
    console.log(_color);
    _color.splitComplements = _color.color.splitComplements;

ColorStore.setColor = function(color) {
  _color = color;
  ColorStore.__emitChange();
};

ColorStore.getColor = function () {
  return Object.assign({}, _color);
};

ColorStore.__onDispatch = function (payload){
  switch(payload.actionType){
    case "colorChanged":
      this.setColor(payload.color);
      break;
  }
};

module.exports = ColorStore;
