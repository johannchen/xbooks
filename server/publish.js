Meteor.publish("mybooks", function(toExchange) {
  return Books.find({"owners.ownerId": this.userId, "owners.exchange": toExchange});
});

Meteor.publish("book", function(id) {
  return Books.find({_id: id});
});

Meteor.publish("searchBooks", function(query) {
  // TODO: query isbn
  // filter books by site (zip, church, friends)?
  // filter owner is not me
  var q = new RegExp(query, 'i');
  return Books.find({$or: [{title: q}, {authors: q}]});
});

Meteor.publish("exchangeBooks", function(church) {
  return Books.find({
    "owners.exchange": true,
    "owners.ownerId": {$ne: this.userId},
    "owners.church": church
  });
});

Meteor.publish("myRequests", function() {
  return Exchanges.find({requesterId: this.userId, requesterBookId: {$exists: false}});
});

// books for my-requests page
Meteor.publish("myResponderBooks", function() {
  let myExchanges = Exchanges.find({requesterId: this.userId, requesterBookId: {$exists: false}}, {fields: {responderBookId: 1}});
  let responderBookIds = myExchanges.map( (exchange) => { return exchange.responderBookId });
  return Books.find({_id: {$in: responderBookIds}});
});

Meteor.publish("myResponse", function() {
  return Exchanges.find({responderId: this.userId, requesterBookId: {$exists: false}});
});

Meteor.publish("ownerBooks", function(id) {
  return Books.find({"owners.ownerId": id, "owners.exchange": true});
});

Meteor.publish("exchange", function(id) {
  return Exchanges.find({_id: id});
});

Meteor.publish("myExchanges", function() {
  return Exchanges.find({exchangeAt: {$exists: true}, $or: [{requesterId: this.userId}, {responderId: this.userId}]});
});

Meteor.publish("myExchangeBooks", function() {
  //TODO filter only my exchange books
  return Books.find();
  /*
  let myExchanges = Exchanges.find({requesterId: this.userId, requesterBookId: {$exists: false}}, {fields: {responderBookId: 1}});
  let responderBookIds = myExchanges.map( (exchange) => { return exchange.responderBookId });
  return Books.find({_id: {$in: responderBookIds}});
  */
});

Meteor.publish("people", function() {
  return Meteor.users.find();
});

Meteor.publish('gbooks', function(query) {
  var self = this;
  try {
    var response = HTTP.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query
      }
    });

    _.each(response.data.items, function(item) {
      var thumb = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
      var title = item.volumeInfo.title;
      var authors = item.volumeInfo.authors;
      var publisher = item.volumeInfo.publisher;
      var publishedDate = item.volumeInfo.publishedDate;
      var pages = item.volumeInfo.pageCount;
      var infoLink = item.volumeInfo.infoLink;
      var previewLink = item.volumeInfo.previewLink;
      var isbn10 = "";
      var isbn13 = "";
      item.volumeInfo.industryIdentifiers && item.volumeInfo.industryIdentifiers.forEach( function(isbn) {
        if (isbn.type === "ISBN_10") { isbn10 = isbn.identifier }
        if (isbn.type === "ISBN_13") { isbn13 = isbn.identifier }
      });
      var snippet = item.searchInfo && item.searchInfo.textSnippet;
      var doc = {
        thumb,
        title,
        authors,
        publisher,
        publishedDate,
        pages,
        infoLink,
        previewLink,
        isbn10,
        isbn13,
        snippet
      };
      self.added('googleBooks', Random.id(), doc);
    });

    self.ready();

  } catch(error) {
    console.log("booksSearch:" + error);
  }
});
