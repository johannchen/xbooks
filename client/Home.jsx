let {
  AppCanvas,
  AppBar,
  IconMenu,
  IconButton,
  RaisedButton,
  FlatButton,
  LinearProgress,
  ToolbarSeparator } = MUI;

Home = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
    };
  },
  render() {
    return (
      <AppCanvas>
          <AppBar
            title="XBooks"
            iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goSearch}>search</IconButton>}
            iconElementRight={
              <div>
                <RaisedButton label="Sign Up" primary={true} onTouchTap={this.handleSignUp}  />
                <ToolbarSeparator />
                <RaisedButton label="Sign In" onTouchTap={this.handleSignIn}  />
              </div>
            } />
          <p>Christian Books Exchange within Your Church.</p>
      </AppCanvas>
    );
  },

  goSearch() {
    FlowRouter.go('/search');
  }
});
