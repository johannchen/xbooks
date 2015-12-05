let { AppBar, IconButton, FontIcon, Styles } = MUI;
let { Colors } = Styles;

MyResponse = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = Meteor.subscribe('mybooks').ready() && Meteor.subscribe('myResponse').ready();
    return {
      loaded,
      exchanges: Exchanges.find({}, {sort: {requestAt: -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <AppBar
          title="My Response"
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>}
          iconElementRight={
            <div>
              <IconButton title="My Requests" onTouchTap={this.goMyRequests}>
                <FontIcon
                  className="zmdi zmdi-swap-vertical"
                  color={Colors.grey50}></FontIcon>
              </IconButton>
              <IconButton title="My Books" onTouchTap={this.goMyBooks}>
                <FontIcon
                  className="zmdi zmdi-collection-bookmark"
                  color={Colors.grey50}></FontIcon>
              </IconButton>
            </div>
          } />
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
      return <Exchange exchange={exchange} book={exchange.responderBook} response={true} key={exchange._id} />;
    });
  },

  goHome() {
    FlowRouter.go('/');
  },

  goMyBooks() {
    FlowRouter.go('/mybooks');
  },

  goMyRequests() {
    FlowRouter.go('/my-requests');
  }
});
