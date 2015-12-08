let { AppBar,
  IconButton,
  Card,
  CardTitle,
  CardText
  } = MUI;

Faq = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          title="FAQ"
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>}
        />
        <Card>
          <CardText>
            <h2>How to exchange books?</h2>
            <p>Exchange books within your church is as easy as 1, 2, 3!</p>
            <ol>
              <li>You request a book and wait for owner's reponse.</li>
              <li>Owner accepts the request by choosing a book from you.</li>
              <li>You two arrange the time and place to exchange the books.</li>
            </ol>
          </CardText>
        </Card>
        <Card>
          <CardText>
            <h2>Can I deny someone's request for my book?</h2>
            <p>Yes, you can by hitting the "Deny" button.</p>
          </CardText>
        </Card>
        <Card>
          <CardText>
            <h2>How likely will someone exchange books with me?</h2>
            <p>You can list more books available to exchange, so others may find a book they like from you.</p>
          </CardText>
        </Card>
        <Card>
          <CardText>
            <h2>I found the information of the book I added is incomplete, what shall I do?</h2>
            <p>You can edit the book with the accurate infomation. Make sure you edit the the right book by checking with the ISBN.</p>
          </CardText>
        </Card>

      </div>
    )
  },

  goHome() {
    FlowRouter.go('/');
  }
});
