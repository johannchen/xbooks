let { AppBar, IconButton } = MUI;

MyBooks = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: this.bookSubReady(),
      books: MyBooks.find().fetch()
    }
  },
  bookSubReady() {
    let booksHandle = Meteor.subscribe('books');
    let myBooksHandle = Meteor.subscribe('mybooks');
    return booksHandle.ready() && myBooksHandle.ready();
  },
  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
            <AppBar
              title="My Books"
              iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goSearch}>add</IconButton>} />
            {this.renderBooks()}
          </div>
          : ''
        }
      </div>
    )
  },

  renderBooks() {
    return this.data.books.map( (mybook) => {
      return <Book book={mybook.book} key={mybook._id} />;
    });
  },

  goSearch() {
    FlowRouter.go('/search');
  }
});
