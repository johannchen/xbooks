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
                  <strong>{this.props.exchange.responder.username}</strong> requested your book at <em>{this.props.exchange.requestAt}</em><br />
                </div>
                :
                <div>
                  Waiting response from owner <strong>{this.props.exchange.responder.username}</strong><br />
                  Requested at {this.props.exchange.requestAt}
                </div>
              }
            </div>
          </CardText>
          <CardActions>
            { this.props.response ?
              <div>
                <FlatButton label="Deny Request" primary={true} onTouchTap={this.cancelRequest} />
                <FlatButton label="Exchange Book" primary={true} />
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

  cancelRequest() {
    if (confirm('Are you sure to cancel this request?')) {
      Meteor.call('removeExchange', this.props.exchange._id);
    }
  }
});
