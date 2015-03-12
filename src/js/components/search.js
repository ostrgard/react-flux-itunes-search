/** @jsx React.DOM */
var React = require('react');
var SearchActions = require('../actions/search-actions');
var SearchStore = require('../stores/search-store');

function getQuery() {
  return {
    query: SearchStore.getQuery(),
    status: SearchStore.getStatus()
  };
}

var Search = React.createClass({
  getInitialState: function(){
    return getQuery();
  },
  componentDidMount: function(){
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    SearchStore.removeChangeListener(this._onChange);
  },
  handleInput: function(event){
    SearchActions.search(event.target.value);
  },
  render: function(){
    var status = 'form-group';
    if (this.state.status.type == 'fail') status = 'form-group has-error';
    if (this.state.status.type == 'success') status = 'form-group has-success';
    
    return (
      <form>
        <div className={status}>
          <div className="input-group"> 
            <div className="input-group-addon">{this.state.status.msg}</div>
            <input id="exampleInput" className="form-control" placeholder="ie. Veto, Elvis Presley or Rodriguez" value={this.state.query} onChange={this.handleInput} />
          </div>
        </div>
      </form>  
    )
  },
  _onChange: function(){
    this.setState(getQuery());
  }
});

module.exports = Search;