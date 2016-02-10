var React = require('react');
var TuningActions = require('../actions/TuningActions');

var Tuner = React.createClass({

  getInitialState: function () {
    return { value: "equal" };
  },

  handleChange: function(e){
    // debugger
    TuningActions.tuningChanged(e.currentTarget.value);
  },

  render: function() {
    return (
      <div className="tuner">
        <select name="select" onChange={this.handleChange} value={this.props.tuning}>
          <option value="equal" selected="selected">Equal Temperament (standard)</option>
          <option value="pythagorean">Pythagorean Tuning</option>
          <option value="correct">Correct Temperament (Werckmeister)</option>
          <option value="well">Well Tuning (Young)</option>
          <option value="limit">5-Limit</option>
        </select>
      </div>
    );
  }
});

module.exports = Tuner;
