var $ = require('jquery');
var SearchConstants = require('../constants/search-constants');
var AppDispatcher = require('../dispatcher');


var _latestQuery = '';

var AppActions = {
  search: function(query){
    _latestQuery = query;

    var status = query === ''? {msg: 'Search for a song or an artist', type: 'init'} : {msg: 'Searching for', type: 'searching'};

    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH,
      query: query,
      status: status,
      results: []
    });

    if (query === '') return false;

    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: 'https://itunes.apple.com/search?term=' + encodeURI(query), 
      success: function(data) {

        if (query !== _latestQuery) return false;

        AppDispatcher.dispatch({
          actionType: SearchConstants.SEARCH,
          query: query,
          status: data.resultCount > 0? {msg: 'Showing results for', type: 'success'} : {msg: 'No results for', type: 'fail'},
          results: data.results
        });
      }
    });
  }
}

module.exports = AppActions;