Books = new Mongo.Collection('books', {
  transform: function(doc) {
    doc.owners = MyBooks.find({
      bookId: doc._id
    });
    return doc;
  }
});

Meteor.methods({
  addGoogleBook: function(book) {
    // TODO: avoid duplicate in Books
    Books.insert(book, function(err, id) {
      MyBooks.insert({
        bookId: id,
        ownerId: Meteor.userId(),
        ownerName: Meteor.user().username,
        /*
        title: book.title,
        authors: book.authors,
        thumb: book.thumb,
        */
        createdAt: Date.now()
      })
    });
  }
});
