/** @jsx React.DOM */
var React = require('react');
var SearchStore = require('../stores/search-store');
var AddToQueue = require('../components/add-to-queue');

function getResults() {
  return {
    results: SearchStore.getResults()
  };
}

var Results = React.createClass({
  getInitialState: function(){
    return getResults();
  },
  componentDidMount: function(){
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    SearchStore.removeChangeListener(this._onChange);
  },
  render: function(){

    if (this.state.results.length == 0) {
      return (<br />);
    }

    var results = this.state.results.map(function(result){
      return <tr key={Math.random()}><td>{result.artistName}</td><td>{result.trackName}</td><td><AddToQueue song={result} /></td></tr>
    });
    
    return (
      <table className="table table-hover">
        <thead>
          <tr><th>Artist</th><th>Track</th></tr>
        </thead>
        <tbody>
          {results}
        </tbody>
      </table>
    )
  },
  _onChange: function(){
    this.setState(getResults());
  }
});

module.exports = Results;