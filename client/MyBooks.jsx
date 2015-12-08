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
      loaded: Meteor.subscribe('mybooks', this.state.toExchange).ready(),
      books: Books.find({}, {sort: {"owners.createdAt": -1}}).fetch()
    }
  },
  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
            <AppBar
              title={this.getTitle()}
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-plus" onTouchTap={this.goAddBook}></IconButton>}
              iconElementRight={
                <div>
                  <IconButton title="Toggle Filter" onTouchTap={this.toggleToExchange}>
                    <FontIcon
                      className={this.state.toExchange ? "zmdi zmdi-square-o" : "zmdi zmdi-check"}
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
      return <Book book={mybook} toExchange={this.state.toExchange} mybook={true} key={mybook._id} />;
    });
  },

  getTitle() {
    let toExchange = "not for Exchange";
    if (this.state.toExchange) {toExchange = "to Exchange";}
    return `My Books ${toExchange} (${this.data.books.length})`;
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
