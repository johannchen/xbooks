Meteor.publish("mybooks", function() {
  return Books.find({"owners.ownerId": this.userId});
});

Meteor.publish("books", function() {
  return Books.find();
});

/*
Meteor.publish("books", function(query) {
  // TODO: query author, isbn
  // filter books by site (zip, church)?
  var q = new RegExp(query, 'i');
  return Books.find({$or: [{title: q}, {authors: q}]});
});
*/


Meteor.publish('booksSearch', function(query) {
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