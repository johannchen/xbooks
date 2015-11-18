let { AppBar, IconButton, FontIcon, Styles } = MUI;
let { Colors } = Styles;
MyBooks = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

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
              iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goAddBook}>add</IconButton>}
              iconElementRight={
                <IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>
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
      return <Book book={mybook} toExchange={me[0].exchange} mybook={true} key={mybook._id} />;
    });
  },

  goAddBook() {
    FlowRouter.go('/add-book');
  },

  goHome() {
    FlowRouter.go('/');
  },

});
