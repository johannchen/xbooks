Books = new Mongo.Collection('books');


Meteor.methods({
  addGoogleBook: function(book) {
    // TODO: avoid duplicate in Books
    gbook = book;
    gbook.owners = [{
      ownerId: Meteor.userId(),
      exchange: true,
      createdAt: Date.now()
    }];
    Books.insert(gbook);
  },

  addOwner: function(id) {
    Books.update(id, {
      $push: {
        owners: {
          ownerId: Meteor.userId(),
          exchange: true,
          createdAt: Date.now()
        }
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
