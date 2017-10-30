import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { fetchUser, fetchEvents } from '../../../actions/index';

import UserInfo from './user-info';

class ViewProfile extends Component {
  componentWillMount() {
    // Fetch user data prior to component mounting
    const userId = cookie.load('user')._id;
    this.props.fetchUser(userId);
    this.props.fetchEvents(userId);
  }

  componentWillUpdate() {
    this.setState({
    
    })
  }

  render() {
    
    const profile = this.props.profile
    return (
      <div>
        <h1>{profile.firstName}&nbsp;{profile.lastName}</h1>
        <p>Role: {profile.role}</p>
        <p>ID: {profile._id}</p>
        <p>Email: {profile.email}</p>

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

export default connect(mapStateToProps, { fetchUser, fetchEvents })(ViewProfile);
