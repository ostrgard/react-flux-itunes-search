/** @jsx React.DOM */
var React = require('react');
var Search = require('../components/search');
var Results = require('../components/results');
var Queue = require('../components/queue');
var Player = require('../components/player');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-8">
            <br />
            <h1>Search iTunes!</h1>
            <br />
            <Search />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Results />
          </div>
          <div className="col-md-4">
            <Player />
            <Queue />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = App;