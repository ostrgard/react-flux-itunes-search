/** @jsx React.DOM */
var React = require('react');
var PlayerStore = require('../stores/player-store');
var PlayerActions = require('../actions/player-actions');

function getPlaying() {
  return {
    currentlyPlaying: PlayerStore.getPlaying()
  };
}

var Player = React.createClass({
  getInitialState: function(){
    return getPlaying();
  },
  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    PlayerStore.removeChangeListener(this._onChange);
  },
  handleClick: function(){
    PlayerActions.playSong(this.props.song.queueId);
  },
  render: function(){
    var playTxt = this.state.currentlyPlaying == this.props.song.queueId? 'Playing' : 'Play';

    return (
      <tr key={this.props.key}><td onClick={this.handleClick}><button className="btn btn-primary">{playTxt}</button></td><td>{this.props.song.artistName}</td><td>{this.props.song.trackName}</td></tr>
    )
  },
  _onChange: function(){  
    this.setState(getPlaying());
  }
});

module.exports = Player;