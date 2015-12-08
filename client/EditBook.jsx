let {
  AppBar,
  Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  FontIcon,
  IconButton,
  TextField
} = MUI;

EditBook = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: FlowRouter.subsReady('book'),
      book: Books.findOne(this.props.bookId)
    }
  },

  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
            <AppBar
              title={this.getTitle()}
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-arrow-left" onTouchTap={this.goMyBooks}></IconButton>}
              iconElementRight={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>}
            />
            <Card style={{marginTop: '10px'}}>
              <CardText>
                <a href={this.data.book.previewLink} target="_blank">
                  <img style={{float: "right", marginLeft: "15px", marginBottom: "5px"}}
                    src={this.data.book.thumb} />
                </a>
                <TextField floatingLabelText="Pages" defaultValue={this.data.book.pages} ref="pages"/>
                <br />
                <TextField floatingLabelText="Published Date" defaultValue={this.data.book.publishedDate} ref="publishedDate" />
                <br />
                <TextField floatingLabelText="Publisher" defaultValue={this.data.book.publisher} ref="publisher" />
                <br />
                <TextField floatingLabelText="Summary" multiLine={true} fullWidth={true} defaultValue={this.data.book.snippet} ref="summary" />
                <br />
                <p>ISBN: {this.data.book.isbn13}</p>
              </CardText>
              <CardActions>
                <FlatButton label="Update Book" primary={true} onTouchTap={this.updateBook} />
              </CardActions>
            </Card>
          </div>
          : 'loading'
        }

      </div>
    )
  },

  authors() {
    return this.data.book.authors ? this.data.book.authors.join(', ') : '';
  },

  getTitle() {
    return `${this.data.book.title} by ${this.authors()}`;
  },

  goHome() {
    FlowRouter.go('/');
  },

  goMyBooks() {
    FlowRouter.go('/mybooks')
  },

  updateBook() {
    const snippet = this.refs.summary.getValue();
    const pages = this.refs.pages.getValue();
    const publishedDate = this.refs.publishedDate.getValue();
    const publisher = this.refs.publisher.getValue();
    if (! snippet) {
      this.refs.summary.setErrorText('summary cannot be blank!');
    } else if (! pages) {
      this.refs.pages.setErrorText('pages cannot be blank!');
    } else if (! publishedDate) {
      this.refs.publishedDate.setErrorText('published date cannot be blank!');
    } else if (! publisher) {
      this.refs.publisher.setErrorText('publisher date cannot be blank!');
    } else {
      const book = {snippet, pages, publishedDate, publisher};
      Meteor.call('updateBook', this.props.bookId, book);
      FlowRouter.go('/mybooks');
    }
  }
});
