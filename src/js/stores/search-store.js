var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SearchConstants = require('../constants/search-constants');
var AppDispatcher = require('../dispatcher');

var _results = [];
var _query = '';
var _status = {msg: 'Search for a song or an artist', type: 'init'};

function _search(query){
  _query = query;
}

var SearchStore = assign({}, EventEmitter.prototype, {
  getResults: function(){
    return _results;
  },

  getQuery: function(){
    return _query;
  },

  getStatus: function(){
    return _status;
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
    case SearchConstants.SEARCH:
      _results = action.results;
      _query = action.query;
      _status = action.status;
      break;

    default: 
      return true;
  }

  SearchStore.emitChange();

  return true;

});

module.exports = SearchStore;