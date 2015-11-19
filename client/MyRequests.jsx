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
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>}
          iconElementRight={
            <div>
              <IconButton title="My Books" onTouchTap={this.goMyBooks}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>collections_book</FontIcon>
              </IconButton>
              <IconButton iconClassName="material-icons" onTouchTap={this.logout}>exit_to_app</IconButton>
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

  logout() {
    Meteor.logout();
  }
});
