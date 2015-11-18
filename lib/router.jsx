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
