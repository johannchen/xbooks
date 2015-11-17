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
            <MyBooks currentUser={this.data.currentUser} />
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
            <p>Christian Books Exchange within Your Church.</p>
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