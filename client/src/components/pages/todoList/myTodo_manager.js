import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser, fetchEvents } from '../../../actions/index';
import {Panel, ListGroup, ListGroupItem, ProgressBar, Accordion} from 'react-bootstrap';
import moment from 'moment';

const mapTodos = (t, i) => {
  return (
    <div key={i} className="task-container">
    <Accordion>
        <Panel bsStyle="info" header={
          <div>
            <h3>{t.title}</h3>
            {/* <input className="menu-checkbox" type="checkbox" /> */}
            <ProgressBar now={25} label={`${25}%`} />
          </div>}>
        <ListGroup fill>
          <ListGroupItem eventKey={1}>
              <strong>Details:</strong>
              <div className="task-details">
              <li className="menu-items"><a><strong>Priority:</strong>&nbsp;
                {t.priority}</a><i className="menu-icon fa fa-"></i>
              </li>
              <li className="menu-items"><a><strong>Category:</strong>&nbsp;
                {t.category}</a><i className="menu-icon fa fa-"></i>
              </li>
              <li className="menu-items"><a><strong>Completed:</strong>&nbsp;
                {t.completed.toString()}</a><i className="menu-icon fa fa-"></i>
              </li>
              <li className="menu-items"><a><strong>Due:</strong>&nbsp;
                {new Date(t.dueDate).toDateString()}</a><i className="menu-icon fa fa-"></i>
              </li>
              </div>
          </ListGroupItem>
          <div>
            <Accordion>
            <Panel header={
              <div>
                <h5><i className="menu-icon fa fa-pencil"></i>&nbsp; Notes:</h5>
              </div>
              }>
                <div className="notes-box">
                  <li className="menu-items">
                    <a>{t.notes}</a>
                  </li>
                </div>
              </Panel>
            </Accordion>
          </div>
          <div>
            <Accordion>
            <Panel header={
              <div>
                <h5><i className="menu-icon fa fa-comment"></i>&nbsp; Comments:</h5>
              </div>
              }>
                <div className="notes-box">
                  <li className="menu-items"><a>{t.notes}</a>
                  </li>
                </div>
              </Panel>
            </Accordion>
          </div>
        </ListGroup>
        </Panel>
    </Accordion>
    </div>
  )
}


const renderTodoList = (item) => {
  return (
    <div>
     {item.todos.map(mapTodos)}
    </div>
  );
}

class MyTodos extends Component {
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
      <div>
        {todos.map(renderTodoList)}
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

export default connect(mapStateToProps, { fetchUser, fetchEvents })(MyTodos);