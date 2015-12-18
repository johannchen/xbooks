Tracker.autorun(function() {
  if (Meteor.user()) {
    Session.set('church', Meteor.user().profile.church);
  }
});

ExchangePage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: Meteor.subscribe('exchangeBooks', Session.get('church')).ready(),
      books: Books.find({}, {sort: {"owners.createdAt": -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <Nav title="Xbooks" />
        { this.data.loaded ?
          <div>
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

});
