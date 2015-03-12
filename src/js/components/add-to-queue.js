/** @jsx React.DOM */
var React = require('react');
var PlayerActions = require('../actions/player-actions');

var Results = React.createClass({
  handleClick: function(){
    PlayerActions.addSong(this.props.song);
  },
  render: function(){    
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>Add to queue</button>
    )
  }
});

module.exports = Results;