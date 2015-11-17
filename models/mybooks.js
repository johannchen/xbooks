MyBooks = new Mongo.Collection("mybooks", {
  transform(doc) {
    doc.book = Book.findOne(doc.bookId);
    return doc;
  }
});



Meteor.methods({
  addBook: function(book) {
    MyBooks.insert({
      bookId: book._id,
      ownerId: Meteor.userId(),
      ownerName: Meteor.user().username,
      /*
      title: book.title,
      authors: book.authors,
      thumb: book.thumb,
      */
      createdAt: Date.now()
    });
  },
  //TODO: send email upon request
  requestBook: function(bookId, ownerId) {
    MyBooks.update({bookId: bookId, ownerId: ownerId}, {
      $set: {
        borrowerId: Meteor.userId(),
        borrowerName: Meteor.user().username,
        requestedAt: Date.now()
      }
    });
  },
  acceptRequest: function(id) {
    MyBooks.update(id, {
      $set: {borrowedAt: Date.now()}
    });
  },
  denyRequest: function(id) {
    MyBooks.update(id, {
      $unset: {requestedAt:"", borrowerId:"", borrowerName:""}
    });
  },
  removeBook: function(id) {
    MyBooks.remove(id);
  }
});
