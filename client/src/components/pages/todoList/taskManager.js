import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { PageHeader, Button, Panel } from 'react-bootstrap';
import TodoManager from '../todoList/myTodo_manager';
import CalendarMenu from '../../calendar/calendarMenu';
import MyTodos from '../todoList/myTodos';
import { fetchUser, fetchEvents } from '../../../actions/index';

class TaskManager extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      openCalendar: true,
      openTodos: true,
      openNotes: true,
      openMenu: true,

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
      <div className="container-row">
        <div id="task-menu" className="container-col side-cont"> 
          <PageHeader>
            <div className="page-header-div">
            <div>
              <i className="fa fa-"></i> <span>Menu</span>
            </div>
            <div>
              <Button onClick={ ()=> this.setState({ openMenu: !this.state.openMenu })}>
                show
              </Button>
            </div>
            </div>
          </PageHeader>
          <Panel collapsible expanded={this.state.openMenu}>
          <CalendarMenu />
          </Panel>
        </div>
      <div className="container-col calendar-panel">
        <PageHeader className="cal-header">
          <i className="fa fa-check-square-o"></i>
        </PageHeader>
        <Panel id="tasksPanel" collapsible expanded={this.state.openCalendar}>
          <TodoManager />
        </Panel>
       </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
    events: state.schedule.events
  };
}


export default connect(mapStateToProps, { fetchUser, fetchEvents })(TaskManager);