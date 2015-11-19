let { AppBar, IconButton, FontIcon, Styles } = MUI;
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
        { this.data.loaded ?
          <div>
            <AppBar
              title="XBooks"
              iconElementLeft={<IconButton iconClassName="material-icons">home</IconButton>}
              iconElementRight={
                <div>
                  <IconButton title="My Response" onTouchTap={this.goMyResponse}>
                    <FontIcon
                      className="material-icons"
                      color={Colors.grey50}>access_alarm</FontIcon>
                  </IconButton>
                  <IconButton title="My Requests" onTouchTap={this.goMyRequests}>
                    <FontIcon
                      className="material-icons"
                      color={Colors.grey50}>swap_vert</FontIcon>
                  </IconButton>
                  <IconButton title="My Books" onTouchTap={this.goMyBooks}>
                    <FontIcon
                      className="material-icons"
                      color={Colors.grey50}>collections_book</FontIcon>
                  </IconButton>
                  <IconButton iconClassName="material-icons" onTouchTap={this.logout}>exit_to_app</IconButton>
                </div>
              } />
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

  logout() {
    Meteor.logout();
  }
});
