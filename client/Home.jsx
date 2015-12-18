let {
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
      currentUser: Meteor.user()
    };
  },

  getInitialState() {
    return {
      signin: true
    };
  },


  render() {
    return (
      <div>
        { this.data.currentUser ?
          <div>
            <ExchangePage />
          </div>
        :
          <div>
            <AppBar
              title="XBooks"
              iconElementRight={
                <div>
                  <RaisedButton label="Sign Up" primary={true} onTouchTap={this.handleSignUp}  />
                  <ToolbarSeparator />
                  <RaisedButton label="Sign In" onTouchTap={this.handleSignIn}  />
                </div>
              } />
            <p>Christian Book Exchange Within Your Church.</p>
            <AccountsMUI signin={this.state.signin}/>
          </div>
        }
      </div>
    );
  },


  handleSignIn() {
    this.setState({signin: true});
  },
  handleSignUp() {
    this.setState({signin: false});
  }
});
