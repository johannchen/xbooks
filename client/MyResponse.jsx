MyResponse = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = Meteor.subscribe('mybooks', true).ready() && Meteor.subscribe('myResponse').ready();
    return {
      loaded,
      exchanges: Exchanges.find({}, {sort: {requestAt: -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <Nav title="My Response" />
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
      return exchange.responderBook && <Exchange exchange={exchange} book={exchange.responderBook} response={true} key={exchange._id} />;
    });
  }
});
