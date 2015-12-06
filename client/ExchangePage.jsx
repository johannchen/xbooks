let { AppBar,
  IconButton,
  FontIcon,
  IconMenu,
  Styles } = MUI;
let MenuItem = MUI.Libs.MenuItem;
let { Colors } = Styles;

ExchangePage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: Meteor.subscribe('exchangeBooks').ready(),
      books: Books.find({}, {sort: {"owners.createdAt": -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <AppBar
          title="XBooks"
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-home"></IconButton>}
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
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <FontIcon className="zmdi zmdi-more-vert" color={Colors.grey50}></FontIcon>
                  </IconButton>
                }>
                <MenuItem primaryText="My Requests" onTouchTap={this.goMyRequests} />
                <MenuItem primaryText="My Exchanges" onTouchTap={this.goMyExchanges} />
                <MenuItem primaryText="Profile" onTouchTap={this.goProfile} />
                <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignOut} />
              </IconMenu>
            </div>
          } />
        { this.data.loaded ?
          <div>
            {this.renderBooks()}
          </div>
          : ''
        }
      </div>
    )
  },

  renderBooks() {
    return this.data.books.map( (book) => {
      return <Book book={book} toRequest={true} key={book._id} />;
    });
  },

  goMyBooks() {
    FlowRouter.go('/mybooks');
  },

  goMyRequests() {
    FlowRouter.go('/my-requests');
  },

  goMyResponse() {
    FlowRouter.go('/my-response');
  },

  goMyExchanges() {
    FlowRouter.go('/my-exchanges');
  },

  goProfile() {
    FlowRouter.go('/profile');
  },

  handleSignOut() {
    Meteor.logout();
    Session.set('church', null);
  }
});
