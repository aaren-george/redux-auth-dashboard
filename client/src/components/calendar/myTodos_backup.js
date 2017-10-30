import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser, fetchEvents } from '../../actions/index';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';


const mapCalendarInfo = (c) => {
  return (
    <div >
      <li className="menu-items"><i className="menu-icon fa fa-calendar-minus-o"><a>&nbsp;{c.name}</a></i>  
        <input className="menu-checkbox" type="checkbox" />
      </li>
    </div>
  )
}

const mapPeopleInfo = (p) => {
  return (
    <div>
    <li className="menu-items"><i className="menu-icon fa fa-user"><a>&nbsp;{p.firstName} {p.lastName}</a></i>
    <input className="menu-checkbox" type="checkbox" />
    </li>
    </div>
  )
}

const mapTags = (tag) => {
  return (
    <div>
    <li className="menu-items"><i className="menu-icon fa fa-tag"><a>&nbsp;{tag}</a></i>
    <input className="menu-checkbox" type="checkbox" />
    </li>
    </div>
  )
}


const renderCalendarMenu = (item) => {
  return (
    <ListGroup fill>
      <ListGroupItem eventKey={1}><strong>Calendars:</strong> {item.calendars.map(mapCalendarInfo)}</ListGroupItem>
      <ListGroupItem eventKey={2}><strong>People:</strong> {item.people.map(mapPeopleInfo)}</ListGroupItem>
      <ListGroupItem eventKey={3}><strong>tags:</strong> {item.hashtags.map(mapTags)}</ListGroupItem>
    </ListGroup>
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
    const myProfile = this.props.profile
    console.log(this.props.profile)
    return (
      <div className="menu-container">
      <Panel bsStyle="info" header={<span>&nbsp;</span>}>
      <div>
        {myProfile.map(renderCalendarMenu)}
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

export default connect(mapStateToProps, { fetchUser, fetchEvents })(MyTodos);