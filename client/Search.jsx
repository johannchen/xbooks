let {
  AppBar,
  IconButton,
  FontIcon,
  TextField,
  Styles } = MUI;
let { Colors } = Styles;

Search = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = false;
    if (this.state.query) {
      let handle = Meteor.subscribe('booksSearch', this.state.query);
      loaded = handle.ready();
    }
    return {
      loaded,
      books: GoogleBooks.find().fetch()
    };
  },
  getInitialState() {
    return {
      query: ''
    }
  },
  render() {
    return (
      <div>
        <AppBar
          iconElementLeft={
            <div>
              <IconButton onTouchTap={this.clearSearch}>
                <FontIcon className="material-icons" color={Colors.grey50}>search</FontIcon>
              </IconButton>
              <TextField
                hintText="Search Title"
                ref="search"
                underlineFocusStyle={{borderColor: Colors.amber900}}
                onEnterKeyDown={this.handleSearch} />
            </div>
          }
          iconElementRight={<IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>} />
        { this.state.query ?
          <div>
            { this.data.loaded ?
              <div>{this.renderBooks()}</div>
              : <p>Loading...</p>
            }
          </div>
          : ''
        }

      </div>
    );
  },
  renderBooks() {
    return this.data.books.map( (book) => {
      return <Book book={book} key={book._id} />;
    });
  },

  goHome() {
    FlowRouter.go('/');
  },

  handleSearch() {
    let query = this.refs.search.getValue();
    this.setState({query});
  }
});
