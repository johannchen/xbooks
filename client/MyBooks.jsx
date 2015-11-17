let { AppBar, IconButton } = MUI;

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
      let me = mybook.owners.filter( (owner) => { return owner.ownerId == this.props.currentUser._id } );
      return <Book book={mybook} toExchange={me[0].exchange} mybook={true} key={mybook._id} />;
    });
  },

  goSearch() {
    FlowRouter.go('/search');
  }
});
