Exchanges = new Mongo.Collection("exchanges", {
  transform(doc) {
    doc.responderBook = Books.findOne(doc.responderBookId);
    doc.requesterBook = Books.findOne(doc.requesterBookId);
    doc.responder = Meteor.users.findOne(doc.responderId);
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
  removeExchange: function(id) {
    Exchanges.remove(id);
  }
});
