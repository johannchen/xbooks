let { AppBar, IconButton, FontIcon, Styles } = MUI;
let { Colors } = Styles;

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
        <AppBar
          title="My Requests"
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>}
          iconElementRight={
            <div>
              <IconButton title="My Response" onTouchTap={this.goMyResponse}>
                <FontIcon
                  className="zmdi zmdi-notifications"
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
      return <Exchange exchange={exchange} book={exchange.responderBook} key={exchange._id} />;
    });
  },

  goHome() {
    FlowRouter.go('/');
  },

  goMyBooks() {
    FlowRouter.go('/mybooks');
  },

  goMyResponse() {
    FlowRouter.go('/my-response');
  }
});
