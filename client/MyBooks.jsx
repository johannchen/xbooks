let { AppBar, IconButton, FontIcon, Checkbox, Styles } = MUI;
let { Colors } = Styles;
MyBooks = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      toExchange: true
    }
  },

  getMeteorData() {
    return {
      loaded: Meteor.subscribe('mybooks').ready(),
      books: Books.find({}, {sort: {"owners.createdAt": -1}}).fetch()
    }
  },
  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
            <AppBar
              title="My Books"
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-plus" onTouchTap={this.goAddBook}></IconButton>}
              iconElementRight={
                <div>
                  <IconButton title="Toggle Filter" onTouchTap={this.toggleToExchange}>
                    <FontIcon
                      className="zmdi zmdi-check"
                      color={Colors.grey50}></FontIcon>
                  </IconButton>
                  <IconButton title="Home" onTouchTap={this.goHome}>
                    <FontIcon
                      className="zmdi zmdi-home"
                      color={Colors.grey50}></FontIcon>
                  </IconButton>
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
    return this.data.books.map( (mybook) => {
      let me = mybook.owners.filter( (owner) => { return owner.ownerId == Meteor.userId() } );
      if (me[0] && me[0].exchange === this.state.toExchange) {
        return <Book book={mybook} toExchange={me[0].exchange} mybook={true} key={mybook._id} />;
      }
    });
  },

  goAddBook() {
    FlowRouter.go('/add-book');
  },

  goHome() {
    FlowRouter.go('/');
  },

  toggleToExchange() {
    this.setState({toExchange: !this.state.toExchange});
  }

});
