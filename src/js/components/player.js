/** @jsx React.DOM */
var React = require('react');
var PlayerStore = require('../stores/player-store');
var PlayerActions = require('../actions/player-actions');

function getPlayerState() {
  return {
    playing: PlayerStore.getPlaying(),
    queue: PlayerStore.getQueue()
  };
}

var Player = React.createClass({
  getInitialState: function(){
    return getPlayerState();
  },
  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);

    this.refs.player.getDOMNode().addEventListener('timeupdate', this.ending);
  },
  componentWillUnmount: function(){
    PlayerStore.removeChangeListener(this._onChange);
  },
  componentDidUpdate: function(prevProps, prevState){
    var that = this;
    if (prevState.playing !== this.state.playing) {      
      this.refs.player.getDOMNode().load();
      this.refs.player.getDOMNode().onloadeddata = function(){
        that.state.stopped = false;
        for (var i = 0; i <= 10; i++) that.setVolume(i, i * 100);
        that.refs.player.getDOMNode().play();
      }
    }
  },
  render: function(){
    var src = this.state.playing >= 0? this.state.queue[this.state.playing].previewUrl : '';
    return (
      <audio ref="player"><source src={src} /></audio>
    )
  },
  ending: function(){
    var that = this;
    if (this.refs.player.getDOMNode().currentTime > 5 && !this.state.stopped) {
      this.state.stopped = true;
      for (var i = 10; i > 0; i--) this.setVolume(i, (i * 100 - 1000) * -1);
      setTimeout(function(){
        that.refs.player.getDOMNode().pause();
        PlayerActions.nextSong(that.state.playing);
      }, 1000);
    }
  },
  setVolume: function(i, delay){
    var that = this;
    setTimeout(function(){ 
      that.refs.player.getDOMNode().volume = i / 10;
    }, delay);
  },
  _onChange: function(){
    this.setState(getPlayerState());
  }
});

module.exports = Player;