var React = require('react');
var WaveformActions = require('../actions/WaveformActions');

var WaveformSelector = React.createClass({
  handleChange: function (e) {
    WaveformActions.waveformChanged(e.currentTarget.value);
    console.log(e.currentTarget.value);
  },

  render: function () {
    return (
      <div className="waveform-selector">
        <h3>Waveform</h3>
        <div className="select-container">
          <select name="select" onChange={this.handleChange} value={this.props.waveform}>
            <option value="triangle" selected="selected">Triangle</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="sine">Sine</option>
          </select>
        </div>
      </div>
    );
  }
});

module.exports = WaveformSelector;
