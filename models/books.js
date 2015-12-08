Books = new Mongo.Collection('books', {
  transform(doc) {
    doc.ownersInfo = doc.owners.map( (owner) => {
      return Meteor.users.findOne(owner.ownerId);
    });
    return doc;
  }
});


Meteor.methods({
  addBook(book, church) {
    let b = Books.findOne({isbn10: book.isbn10})
    if (b) {
      // add owner
      // avoid duplicate owner
      if (b.owners.findIndex( (owner) => { return owner.ownerId === Meteor.userId(); } ) === -1) {
        Books.update(b._id, {
          $push: {
            owners: {
              ownerId: Meteor.userId(),
              exchange: true,
              createdAt: Date.now()
            }
          }
        });
      } else {
        console.log("you already own this book.")
      }
    } else {
      gbook = book;
      gbook.owners = [{
        ownerId: Meteor.userId(),
        exchange: true,
        createdAt: Date.now(),
        church
      }];
      Books.insert(gbook);
    }
  },

  updateBook(id, book) {
    Books.update(id, {
      $set: book
    });
  },

  //update my books when change church
  updateBooks(church) {
    Books.update({"owners.ownerId": Meteor.userId()}, {
      $set: {"owners.$.church": church}
    }, {multi: true});
  },

  removeMyBook(id) {
    Books.update(id, {
      $pull: {
        owners: {ownerId: Meteor.userId()}
      }
    });
  },

  addComment(id, comment) {
    Books.update(id, {
      $push: {
        comments: {
          id: Random.id(),
          comment,
          username: Meteor.user().username,
          createdAt: Date.now()
        }
      }
    });
  },

  removeComment(id, commentId) {
    Books.update(id, {
      $pull: {
        comments: {id: commentId}
      }
    });
  },

  toggleExchange(id, toggleValue) {
    Books.update({_id: id, "owners.ownerId": Meteor.userId()}, {
      $set: {"owners.$.exchange": toggleValue}
    });
  },

  exchangeBook(requesterId, requesterBookId, responderBookId) {
    Books.update(requesterBookId, {
      $push: {
        owners: {
          ownerId: Meteor.userId(),
          exchange: false,
          createdAt: Date.now()
        }
      }
    });
    Books.update(requesterBookId, {
      $pull: {
        owners: {ownerId: requesterId}
      }
    });
    Books.update(responderBookId, {
      $push: {
        owners: {
          ownerId: requesterId,
          exchange: false,
          createdAt: Date.now()
        }
      }
    });
    Books.update(responderBookId, {
      $pull: {
        owners: {ownerId: Meteor.userId()}
      }
    });
  }
});
