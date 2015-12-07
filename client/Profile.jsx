let {
  AppBar,
  IconButton,
  FlatButton,
  Card,
  CardText,
  CardTitle,
  CardActions,
  TextField
  } = MUI;

Profile = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let profile = Meteor.user() && Meteor.user().profile;
    return {
      currentUser: Meteor.user(),
      profile
    };
  },

  render() {
    return (
      <div>
        { this.data.currentUser ?
          <div>
            <AppBar
              title="My Profile"
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>} />
            <Card style={{marginTop: '10px'}}>
              <CardTitle title={this.data.currentUser.username} />
              <CardText>
                <TextField
                  floatingLabelText="My Name"
                  defaultValue={this.data.profile ? this.data.profile.name : ''}
                  ref="myName" />
                <br />
                <TextField
                  floatingLabelText="Home Church"
                  defaultValue={this.data.profile ? this.data.profile.church : ''}
                  ref="church" />
              </CardText>
              <CardActions>
                <FlatButton label="Update Profile" primary={true} onTouchTap={this.updateProfile} />
              </CardActions>
            </Card>
          </div>
          : ''
        }
      </div>
    );
  },

  goHome() {
    FlowRouter.go('/');
  },

  updateProfile() {
    const name = this.refs.myName.getValue();
    const church = this.refs.church.getValue();
    if(! church) {
      this.refs.church.setErrorText('Cannot update church blank!');
    } else {
      const profile = {name, church};
      Meteor.call('updateProfile', profile);
      Meteor.call('updateBooks', church);
      Session.set('church', church);
      FlowRouter.go('/');
    }
  }
});
