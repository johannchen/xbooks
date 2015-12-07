FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Home />;
      }
    });
  }
});

FlowRouter.route('/profile', {
  name: 'profile',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <Profile />;
      }
    });
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <Faq />;
      }
    });
  }
});

FlowRouter.route('/feedback', {
  name: 'feedback',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <Feedback />;
      }
    });
  }
});

FlowRouter.route('/add-book', {
  name: 'add-book',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <AddBook />;
      }
    });
  }
});

FlowRouter.route('/mybooks', {
  name: 'mybooks',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <MyBooks />;
      }
    });
  }
});

FlowRouter.route('/my-requests', {
  name: 'my-requests',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <MyRequests />;
      }
    });
  }
});

FlowRouter.route('/my-response', {
  name: 'my-response',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <MyResponse />;
      }
    });
  }
});

FlowRouter.route('/exchange/:_id', {
  name: 'exchange',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <ExchangeBook exchangeId={params._id} />;
      }
    });
  }
});

FlowRouter.route('/my-exchanges', {
  name: 'my-exchanges',
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <MyExchanges />;
      }
    });
  }
});
/*
FlowRouter.route('/verse/:_id', {
  name: 'verse',
  subscriptions: function(params) {
    this.register('verse', Meteor.subscribe('verse', params._id));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <VersePage verseId={params._id} />;
      }
    });
  }
});
*/
