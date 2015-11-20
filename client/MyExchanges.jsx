let {
  AppBar,
  IconButton,
  FontIcon,
  Styles,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow
} = MUI;
let { Colors } = Styles;

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
        <AppBar
          title="My Exchanges"
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goHome}>home</IconButton>}
          iconElementRight={
            <div>
              <IconButton title="My Response" onTouchTap={this.goMyResponse}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>access_alarm</FontIcon>
              </IconButton>
              <IconButton title="My Requests" onTouchTap={this.goMyRequests}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>swap_vert</FontIcon>
              </IconButton>
              <IconButton title="My Books" onTouchTap={this.goMyBooks}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>collections_book</FontIcon>
              </IconButton>
            </div>
          } />
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
    return this.data.exchanges.map( (exchange) => {
      return <ExchangeInfo exchange={exchange} key={exchange._id} />;
    });
  },

  goHome() {
    FlowRouter.go('/');
  },

  goMyBooks() {
    FlowRouter.go('/mybooks');
  },

  goMyRequests() {
    FlowRouter.go('/my-requests');
  },

  goMyResponse() {
    FlowRouter.go('/my-response');
  },
});
