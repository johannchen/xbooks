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
            <div>
              <a href={this.props.book.previewLink}>
                <img style={{float: "left", marginRight: "15px"}} src={this.props.book.thumb} />
              </a>
              <p><span dangerouslySetInnerHTML={{__html: this.props.book.snippet}} /></p>
              <p>{this.props.book.pages} pages, published on {this.props.book.publishedDate} by {this.props.book.publisher}, ISBN: {this.props.book.isbn13}</p>
            </div>
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
        </Card>
      </div>
    )
  },

  authors() {
    return this.props.book.authors ? this.props.book.authors.join(', ') : '';
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
    // TODO: email responder
    FlowRouter.go('/my-requests');
  },

  handleExchangeBook() {
    Meteor.call('exchangeBook', this.props.exchange.requesterId, this.props.book._id, this.props.exchange.responderBookId);
    Meteor.call('exchangeComplete', this.props.exchange._id, this.props.book._id);
    FlowRouter.go('/mybooks');
  }

});
