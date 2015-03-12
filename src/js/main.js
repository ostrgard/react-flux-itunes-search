/** @jsx React.DOM */
var React = require('react');
var App = require('./components/app');
var SearchActions = require('./actions/search-actions');

React.render(
  <App />,
  document.getElementById('main')
);

var initSearch = window.location.search.split('?')[1] === undefined? '' : window.location.search.split('?')[1];
SearchActions.search(initSearch);