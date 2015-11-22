Session.setDefault('bookTitle', null);

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

Exchange = React.createClass({
  getInitialState() {
    return {
      message: '',
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
            <div>
              <a href={this.props.book.previewLink}>
                <img style={{float: "left", marginRight: "15px"}} src={this.props.book.thumb} />
              </a>
              <p><span dangerouslySetInnerHTML={{__html: this.props.book.snippet}} /></p>
              <p>{this.props.book.pages} pages, published on {this.props.book.publishedDate} by {this.props.book.publisher}, ISBN: {this.props.book.isbn13}</p>
              { this.props.response ?
                <div>
                  <strong>{this.props.exchange.requester.username}</strong> requested your book at <em>{this.props.exchange.requestDate}</em><br />
                </div>
                :
                <div>
                  Waiting response from owner <strong>{this.props.exchange.responder.username}</strong><br />
                Requested at {this.props.exchange.requestDate}
                </div>
              }
            </div>
          </CardText>
          <CardActions>
            { this.props.response ?
              <div>
                <FlatButton label="Deny Request" onTouchTap={this.denyRequest} />
                <FlatButton label={this.exchangeLabel()} primary={true} onTouchTap={this.goExchangeBook}/>
              </div>
              : <FlatButton label="Cancel Request" primary={true} onTouchTap={this.cancelRequest} />
            }
          </CardActions>
        </Card>
      </div>
    )
  },

  authors() {
    return this.props.book.authors ? this.props.book.authors.join(', ') : '';
  },

  exchangeLabel() {
    return `Exchange with ${this.props.exchange.requester.username}`;
  },

  cancelRequest() {
    if (confirm('Are you sure to cancel this request?')) {
      Meteor.call('removeExchange', this.props.exchange._id);
      //send email to responder
      let to = this.props.exchange.responder.emails[0].address;
      let from = Meteor.user().emails[0].address;
      let subject = `${Meteor.user().username} cancel the request to exchange ${this.props.exchange.responderBook.title}`;
      let content = "You don't need to do anything.";
      Meteor.call('sendEmail', to, from, subject, content);
    }
  },

  denyRequest() {
    if (confirm('Are you sure to deny this request?')) {
      Meteor.call('removeExchange', this.props.exchange._id);
      //send email to responder
      let to = this.props.exchange.requester.emails[0].address;
      let from = Meteor.user().emails[0].address;
      let subject = `${Meteor.user().username} deny the request to exchange ${this.props.exchange.responderBook.title}`;
      let content = `Sorry, you may try to request books from another user, or you can try to add a book that ${Meteor.user().username} is willing to exchange with.`;
      Meteor.call('sendEmail', to, from, subject, content);
    }
  },

  goExchangeBook() {
    Session.set('bookTitle', this.props.book.title);
    FlowRouter.go(`/exchange/${this.props.exchange._id}`);
  }
});
