let {
  AppBar,
  IconButton,
  FontIcon,
  TextField,
  Styles } = MUI;
let { Colors } = Styles;

AddBook = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let gbooksLoaded = false;
    //let booksLoaded = false;
    if (this.state.query) {
      gbooksLoaded = Meteor.subscribe('gbooks', this.state.query).ready();
    //  booksLoaded = Meteor.subscribe('searchBooks', this.state.query).ready();
    }
    return {
      gbooksLoaded,
      gbooks: GoogleBooks.find().fetch()
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
                hintText="Search Book Then Add"
                ref="search"
                underlineFocusStyle={{borderColor: Colors.amber900}}
                onEnterKeyDown={this.handleSearch} />
            </div>
          }
          iconElementRight={<IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>} />
        { this.state.query ?
          <div>
            { this.data.gbooksLoaded ?
              <div>{this.renderGbooks()}</div>
              : <p>Loading...</p>
            }
          </div>
          : ''
        }
      </div>
    );
  },

  renderGbooks() {
    return this.data.gbooks.map( (book) => {
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