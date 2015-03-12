var PlayerConstants = require('../constants/player-constants');
var AppDispatcher = require('../dispatcher');

var AppActions = {
  addSong: function(song){
    AppDispatcher.dispatch({
      actionType: PlayerConstants.ADD_SONG,
      song: song
    });
  },
  removeSong: function(index){
    AppDispatcher.dispatch({
      actionType: PlayerConstants.REMOVE_SONG,
      index: index
    });
  },
  playSong: function(index){
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAY_SONG,
      index: index
    });
  },
  nextSong: function(index){
    AppDispatcher.dispatch({
      actionType: PlayerConstants.NEXT_SONG,
      index: index
    });
  },
  prevSong: function(index){
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PREV_SONG,
      index: index
    });
  }
}

module.exports = AppActions;