Exchanges = new Mongo.Collection("exchanges", {
  transform(doc) {
    doc.responderBook = Books.findOne(doc.responderBookId);
    doc.requesterBook = Books.findOne(doc.requesterBookId);
    doc.responder = Meteor.users.findOne(doc.responderId);
    doc.requester = Meteor.users.findOne(doc.requesterId);
    doc.exchangeDate = moment(doc.exchangeAt).format('L');
    doc.requestDate = moment(doc.requestAt).format('L');
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
  exchangeComplete: function(id, requesterBookId) {
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
  },
  resetExchanges: function() {
    Exchanges.remove();
  }
});
