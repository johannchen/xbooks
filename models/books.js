Books = new Mongo.Collection('books');


Meteor.methods({
  addBook: function(book) {
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
        createdAt: Date.now()
      }];
      Books.insert(gbook);
    }
  },

  removeMyBook: function(id) {
    Books.update(id, {
      $pull: {
        owners: {ownerId: Meteor.userId()}
      }
    });
  },

  toggleExchange: function(id, toggleValue) {
    Books.update({_id: id, "owners.ownerId": Meteor.userId()}, {
      $set: {"owners.$.exchange": toggleValue}
    });
  },

  exchange: function(requesterId, requesterBookId, responderId, responderBookId) {
    Books.update(requesterBookId, {
      $push: {
        owners: {
          ownerId: responderId,
          exchange: false,
          createdAt: Date.now()
        }
      },
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
      },
      $pull: {
        owners: {ownerId: responderId}
      }
    });
  }
});
