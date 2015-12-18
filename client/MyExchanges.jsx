let {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow
} = MUI;

MyExchanges = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = Meteor.subscribe('myExchangeBooks').ready() && Meteor.subscribe('myExchanges').ready();
    return {
      loaded,
      exchanges: Exchanges.find().fetch()
    }
  },

  render() {
    return (
      <div>
        <Nav title="My Exchanges" />
        { this.data.loaded ?
          <Table selectable={false}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn tooltip='request'>Request</TableHeaderColumn>
                <TableHeaderColumn tooltip='response'>Response</TableHeaderColumn>
                <TableHeaderColumn tooltip='exchange date'>Exchange Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderExchanges()}
            </TableBody>
          </Table>
          : ''
        }
      </div>
    )
  },

  renderExchanges() {
    // TODO: render responsive on mobile
    return this.data.exchanges.map( (exchange) => {
      return <ExchangeInfo exchange={exchange} key={exchange._id} />;
    });
  }
});
