let { Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  FontIcon,
  IconButton,
  Checkbox,
  SelectField,
  DropDownMenu,
  TextField
} = MUI;

Book = React.createClass({
  getInitialState() {
    return {
      message: '',
      responder: ''
    }
  },
  render() {
    return (
      <div>
        <Card style={{marginTop: '10px'}}>
          <CardTitle
            title={this.props.book.title}
            subtitle={this.authors()} />
          <CardText>
            <a href={this.props.book.previewLink}>
              <img style={{float: "left", marginRight: "15px", marginBottom: "5px"}}
                src={this.props.book.thumb} />
            </a>
            <p><span dangerouslySetInnerHTML={{__html: this.props.book.snippet}} /></p>
            <p>{this.props.book.pages} pages, published on {this.props.book.publishedDate} by {this.props.book.publisher}</p>
            <p>ISBN: {this.props.book.isbn13}</p>
          </CardText>
          <CardActions>
            { this.props.mybook ?
              <div>
                <Checkbox
                  name="exchange"
                  value="exchange"
                  label="to exchange"
                  defaultChecked={this.props.toExchange}
                  onCheck={this.toggleExchange} />
                <FlatButton label="Remove Book" onTouchTap={this.handleRemoveMyBook} />
              </div>
              :
              <div>
                { this.props.toRequest ?
                  <div>
                    <DropDownMenu ref="responder"
                      displayMember="username"
                      valueMember="_id"
                      menuItems={this.props.book.ownersInfo} />
                    <FlatButton label="Request Book" primary={true} onTouchTap={this.handleRequestBook} />
                  </div>
                  :
                  <div>
                    { this.props.exchange ?
                      <FlatButton label="Exchange" primary={true} onTouchTap={this.handleExchangeBook} />
                      : <FlatButton label="Add To My Books" primary={true} onTouchTap={this.handleAddBook} />
                    }
                  </div>
                }
              </div>
            }
          </CardActions>
          <CardText>
            <TextField hintText="Any comments on this verse?" ref="newComment" fullWidth={true} multiLine={true} />
            <FlatButton label="Add Comment" secondary={true} onTouchTap={this.addComment} />
            {this.renderComments()}
          </CardText>
        </Card>
      </div>
    )
  },

  authors() {
    return this.props.book.authors ? this.props.book.authors.join(', ') : '';
  },

  renderComments() {
    if (this.props.book.comments) {
      let bookId = this.props.book._id;
      return this.props.book.comments.map( (comment) => {
        return <Comment key={comment.id} comment={comment} bookId={bookId} />;
      });
    }
  },

  handleAddBook() {
    Meteor.call('addBook', this.props.book);
    FlowRouter.go('/mybooks');
  },

  handleRemoveMyBook() {
    if (confirm('Are you sure to remove this book?')) {
      Meteor.call('removeMyBook', this.props.book._id);
    }
  },

  toggleExchange() {
    Meteor.call('toggleExchange', this.props.book._id, !this.props.toExchange);
  },

  handleRequestBook() {
    let index = this.refs.responder.state.selectedIndex;
    // TODO: a better way to get value from dropdown menu without onChange?
    let responderId = this.props.book.owners[index].ownerId;
    // TODO: avoid duplicate request from the same responder
    Meteor.call('requestBook', this.props.book._id, responderId);
    // email responder
    let me = Meteor.user();
    let to = Meteor.users.findOne(responderId).emails[0].address;
    let sender = me.emails[0].address;
    let subject = `${me.username} requests ${this.props.book.title}`;
    let content = `Please respond to the request at`;
    Meteor.call('sendEmail', to, sender, subject, content);
    // TODO: indicate an email is sent
    FlowRouter.go('/my-requests');
  },

  handleExchangeBook() {
    // send confirmation emai
    // TODO: get responder book title
    let requester = this.props.exchange.requester;
    let to = requester.emails[0].address;
    let from = Meteor.user().emails[0].address;
    let subject = 'Congratulations! your books are exchanged at Xbooks';
    let content = `Please arrange the time and place to exchange the books between you two. (${requester.username}) ${this.props.book.title} exchanges with (${Meteor.user().username}) ${Session.get('bookTitle')}`;
    Meteor.call('sendEmail', to, from, subject, content);
    // exchange book
    Meteor.call('exchangeBook', this.props.exchange.requesterId, this.props.book._id, this.props.exchange.responderBookId);
    Meteor.call('exchangeComplete', this.props.exchange._id, this.props.book._id);
    //TODO: become friends after exchange
    Session.set('bookTitle', null);
    FlowRouter.go('/mybooks');
  },

  addComment() {
    let comment = this.refs.newComment.getValue();
    if (comment) {
      Meteor.call('addComment', this.props.book._id, comment);
      this.refs.newComment.setValue(null);
    }
  }

});
