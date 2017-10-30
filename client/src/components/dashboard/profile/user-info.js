import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return (
      <div>
        {this.props.profile}
        {this.props.events}
      </div>
    );
  }
}

export default UserInfo;
