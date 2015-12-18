MyRequests = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = Meteor.subscribe('myResponderBooks').ready() && Meteor.subscribe('myRequests').ready();
    return {
      loaded,
      exchanges: Exchanges.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <Nav title="My Requests" />
        { this.data.loaded ?
          <div>
            {this.renderExchanges()}
          </div>
          : ''
        }
      </div>
    )
  },

  renderExchanges() {
    return this.data.exchanges.map( (exchange) => {
      return <Exchange exchange={exchange} book={exchange.responderBook} key={exchange._id} />;
    });
  }
});
