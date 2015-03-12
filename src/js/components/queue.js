/** @jsx React.DOM */
var React = require('react');
var PlayerStore = require('../stores/player-store');
var QueueItem = require('../components/queue-item');

function getQueue() {
  return {
    queue: PlayerStore.getQueue()
  };
}

var Queue = React.createClass({
  getInitialState: function(){
    return getQueue();
  },
  componentDidMount: function(){
    PlayerStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    PlayerStore.removeChangeListener(this._onChange);
  },
  render: function(){

    if (this.state.queue.length == 0) {
      return (<br />);
    }

    var queue = this.state.queue.map(function(song){
      if (song)
        return <QueueItem key={song.queueId} song={song} />;
    });
    
    return (
      <table className="table table-hover">
        <thead>
          <tr><th></th><th>Artist</th><th>Track</th></tr>
        </thead>
        <tbody>
          {queue}
        </tbody>
      </table>
    )
  },
  _onChange: function(){
    this.setState(getQueue());
  }
});

module.exports = Queue;