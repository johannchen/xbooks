let { Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  FontIcon,
  IconButton,
  Checkbox,
  TextField
} = MUI;

Book = React.createClass({
  getInitialState() {
    return {
      message: ''
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
                  <FlatButton label="Request Book" primary={true} onTouchTap={this.handleRequestBook} />
                  : <FlatButton label="Add To My Books" primary={true} onTouchTap={this.handleAddBook} />
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

  handleRequestBook() {

  },

  toggleExchange() {
    Meteor.call('toggleExchange', this.props.book._id, !this.props.toExchange);
  }
});
