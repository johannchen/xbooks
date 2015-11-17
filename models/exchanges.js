Exchanges = new Mongo.Collection("exchanges", {
  transform(doc) {
    doc.responderBook = Book.findOne(doc.responderBookId);
    doc.requesterBook = Book.findOne(doc.requesterBookId);
    return doc;
  }
});

Meteor.methods({
  //TODO: send email upon request
  requestBook: function(responderBookId, responderId) {
    Exchanges.insert({
      requesterId: Meteor.userId(),
      responderId,
      responderBookId,
      requestAt: Date.now()
    });
  },
  exchangeBook: function(id, requesterBookId) {
    Exchanges.update(id, {
      $set: {
        requesterBookId,
        exchangeAt: Date.now()
      }
    }, function (err) {
      // exchange ownership
      console.log(err);
    });
  },
  denyRequest: function(id) {
    Exchanges.remove(id);
  }
});
