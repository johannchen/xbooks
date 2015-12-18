let { AppBar,
  IconButton,
  FontIcon,
  IconMenu,
  Styles } = MUI;
let MenuItem = MUI.Libs.MenuItem;
let { Colors } = Styles;

Nav = React.createClass({
  render() {
    return (
      <AppBar
        title={this.props.title}
        iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>}
        iconElementRight={
          <div>
            <IconButton title="My Response" onTouchTap={this.goMyResponse}>
              <FontIcon
                className="zmdi zmdi-notifications"
                color={Colors.grey50}></FontIcon>
            </IconButton>
            <IconButton title="My Requests" onTouchTap={this.goMyRequests}>
              <FontIcon
                className="zmdi zmdi-label-heart"
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
              <MenuItem primaryText="My Exchanges" onTouchTap={this.goMyExchanges} />
              <MenuItem primaryText="Profile" onTouchTap={this.goProfile} />
              <MenuItem primaryText="FAQ" onTouchTap={this.goFaq} />
              <MenuItem primaryText="Feedback" onTouchTap={this.goFeedback} />
              <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignOut} />
            </IconMenu>
          </div>
        }
      />
    )
  },

  goHome() {
    FlowRouter.go('/');
  },

  goFeedback() {
    FlowRouter.go('/feedback');
  },

  goFaq() {
    FlowRouter.go('/faq');
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
