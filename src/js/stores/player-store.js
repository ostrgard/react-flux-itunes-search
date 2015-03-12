var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PlayerConstants = require('../constants/player-constants');
var AppDispatcher = require('../dispatcher');

var _queue = [];
var _playing = -1;

function _addSong(song) {
  var id = _queue.length;
  song.queueId = id;
  _queue[id] = song;
}

function _removeSong(index) {
  _queue.splice(index, 1);
  
  if (index === _playing.index)
    _playing = {};
}

function _playSong(index) {
  _playing = index;
}

function _nextSong(index) {
  if (index + 1 >= _queue.length)
    _playing = 0;
  else
    _playing = index + 1;

  if (_queue[_playing] == undefined) 
    _nextSong(_playing);
}

function _prevSong(index) {
  if (index - 1 < 0)
    _playing = _queue.length - 1;
  else
    _playing = index - 1;

  if (_queue[_playing] == undefined)
    _prevSong(_playing);
}


var PlayerStore = assign({}, EventEmitter.prototype, {
  getQueue: function(){
    return _queue;
  },
  getPlaying: function(){
    return _playing;
  },
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action){
  switch(action.actionType) {
    case PlayerConstants.ADD_SONG:
      _addSong(action.song);
      break;

    case PlayerConstants.REMOVE_SONG:
      _removeSong(action.index);
      break;

    case PlayerConstants.PLAY_SONG:
      _playSong(action.index);
      break;

    case PlayerConstants.NEXT_SONG:
      _nextSong(action.index);
      break;

    case PlayerConstants.PREV_SONG:
      _prevSong(action.index);
      break;

    default: 
      return true;
  }

  PlayerStore.emitChange();

  return true;

});

module.exports = PlayerStore;