let { AppBar, IconButton, FontIcon, Styles } = MUI;
let { Colors } = Styles;

ExchangeBook = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = false;
    let handle = Meteor.subscribe('exchange', this.props.exchangeId);
    let exchange = {};
    if (handle.ready()) {
      exchange = Exchanges.findOne();
      loaded = Meteor.subscribe('ownerBooks', exchange.requesterId).ready();
    }

    return {
      exchangeLoaded: handle.ready(),
      exchange,
      loaded,
      books: Books.find({}, {sort: {"owners.createdAt": -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        { this.data.exchangeLoaded ?
          <div>
            <AppBar
              title={this.getTitle()}
              iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goMyResponse}>arrow_back</IconButton>}
              iconElementRight={
                <IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>
              } />
            { this.data.loaded ?
              <div>
                {this.renderBooks()}
              </div>
              : ''
            }
          </div>
          : ''
        }
      </div>
    )
  },

  renderBooks() {
    return this.data.books.map( (book) => {
      return <Book book={book} exchange={this.data.exchange} key={book._id} />;
    });
  },

  getTitle() {
    console.log(this.data.exchange);
    return `Exchange With ${this.data.exchange.requester.username}`;
  },

  goMyResponse() {
    FlowRouter.go('/my-response');
  },

  goHome() {
    FlowRouter.go('/');
  }

});