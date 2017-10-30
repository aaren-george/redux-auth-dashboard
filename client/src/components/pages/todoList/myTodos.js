import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser, fetchEvents } from '../../../actions/index';
import {Panel, ListGroup, ListGroupItem, Tab, TabContainer, Row, Col, Nav, NavItem, NavDropdown, TabPane} from 'react-bootstrap';

const mapTodos = (t) => {
  return (
    <div>
    <li className="menu-items">
      <i className="menu-icon fa fa-check"><a>&nbsp;{t.title}</a></i>
    <input className="menu-checkbox" type="checkbox" />
    </li>
    </div>
  )
}


const renderTodoList = (item) => {
  return (
    <ListGroup fill>
      <ListGroupItem eventKey={1}><strong>Todos:</strong> {item.todos.map(mapTodos)}</ListGroupItem>
    </ListGroup>
  );
}

class TodoManager extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    const userId = cookie.load('user')._id;
    this.props.fetchUser(userId);
    this.props.fetchEvents(userId);

  }

  render() {
    const todos = this.props.profile
    console.log(this.props.profile)
    return (
      <div className="menu-container">
      <Panel bsStyle="info" header={<span>&nbsp;</span>}>
      <div>
        {todos.map(renderTodoList)}
      </div>
      </Panel>
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

export default connect(mapStateToProps, { fetchUser, fetchEvents })(TodoManager);