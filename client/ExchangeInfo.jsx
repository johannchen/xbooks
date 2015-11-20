let {
  TableRow,
  TableRowColumn
} = MUI;

ExchangeInfo = React.createClass({
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.exchange.requesterBook.title} ({this.props.exchange.requester.username}) </TableRowColumn>
        <TableRowColumn>{this.props.exchange.responderBook.title} ({this.props.exchange.responder.username}) </TableRowColumn>
        <TableRowColumn>{this.props.exchange.exchangeDate}</TableRowColumn> 
      </TableRow>
    )
  }
});
