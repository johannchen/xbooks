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
          <CardTitle title="How to exchange books?" />
          <CardText>
            <p>Exchange books within your church is as easy as 1, 2, 3!</p>
            <ol>
              <li>You request a book and wait for owner's reponse.</li>
              <li>Owner accepts the request by choosing a book from you.</li>
              <li>You two arrange the time and place to exchange the books.</li>
            </ol>
          </CardText>
        </Card>
      </div>
    )
  },

  goHome() {
    FlowRouter.go('/');
  }
});
