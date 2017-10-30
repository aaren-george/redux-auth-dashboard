import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { PageHeader, Button, Panel } from 'react-bootstrap';
import { fetchUser, fetchEvents } from '../../../actions/index';
import Form from '../../TodoList1/MaterialTodo'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

class NewTodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
componentWillMount() {
    // Fetch user data prior to component mounting
    const userId = cookie.load('user')._id;
    this.props.fetchUser(userId);
    this.props.fetchEvents(userId);
  }

  render() {
    return (
      <div className="container-col calendar-panel">
        <PageHeader className="cal-header">
          <i className="fa fa-check-square-o"></i>
        </PageHeader>
        <Panel id="tasksPanel">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Form />
        </MuiThemeProvider>
        </Panel>
       </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
    events: state.schedule.events,
    notification: state.notification,
    routing: state.routing,
    tasks: state.tasks
  };
}


export default connect(mapStateToProps, { fetchUser, fetchEvents })(NewTodoList);