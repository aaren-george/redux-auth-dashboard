import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { MenuItem, DropdownButton, NavDropdown, NavItem, Nav, Panel } from 'react-bootstrap';
import cookie from 'react-cookie';
import { fetchUser, fetchEvents } from '../actions/index';

class HeaderTemplate extends Component {
  state = { visible: false }
  
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  componentDidMount() {
    if (this.props.authenticated) {
      const userId = cookie.load('user')._id;
      this.props.fetchUser(userId);
      const loginProfile = [ 'Profile' ];
    }
    // Fetch user data prior to component mounting

  }
  
  renderLinks(title, index) {
    if (this.props.authenticated) {
      return [
        // Home Button
        <li key={index} className="i-large">
        <Link>
        <NavDropdown id="user-login" noCaret title={<i className="fa fa-user-circle">&nbsp;<a>{this.state.lastName}</a></i>}>
            <MenuItem eventKey="1"><Link to='/profile'>Profile</Link></MenuItem>
            <MenuItem eventKey="2">Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3"><Link to='/logout'>Logout</Link></MenuItem>
          </NavDropdown>
        </Link>
        </li>,
      ]
    } else {
      return [
        // Unauthenticated navigation
        <li key={1}>
        </li>
      ];
    }
  }

  renderBarIcon(title, index) {
    if (this.props.authenticated) {
      return [
        // Home Button
        <li key={index} className="i-large">
          <Link>
          <NavDropdown title={<i className="fa fa-bars"></i>} id="user-login" noCaret>
            <Panel header="myApps" />  
            <MenuItem eventKey="1"><Link to='/new-calendar'>Calendar &nbsp;<i className="fa fa-calendar"><a></a></i></Link></MenuItem>
            <MenuItem eventKey="2"><Link to='/tasks'>Tasks &nbsp;<i className="fa fa-check-square-o"><a></a></i></Link></MenuItem>
            <MenuItem eventKey="3"><Link to='/new-tasks'>New Tasks &nbsp;<i className="fa fa-check-square-o"><a></a></i></Link></MenuItem>          
          </NavDropdown>
          </Link>
        </li>,
      ]
    } else {
      return [
        // Unauthenticated navigation
        <li key={1}>
        </li>
      ];
    }
  }

  render() {
    const { visible } = this.state
    const userInfo = this.props.profile["0"]
    if (this.props.authenticated) {
    return (
      <div>
        <nav id="header" className="navbar navbar-default navbar-fixed-top">
          <div className="nav-icon-style">
            <div className="nav-bars-class">
              <ul className="nav navbar-nav">
              {this.renderBarIcon()}
              </ul>
            </div>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                <span id="nav-icon-1" className="icon-bar" />
              </button>
              {<Link className="navbar-brand">{this.props.logo}</Link>}
            </div>

            <div className="collapse navbar-collapse" id="nav-collapse">
              <ul className="nav navbar-nav navbar-right">
              <li className="i-large">
                <Link>
                <NavDropdown id="user-login" noCaret title={<i className="fa fa-user-circle">&nbsp;<a></a></i>}>
                    <MenuItem eventKey="1"><Link to='/profile'>Profile &nbsp;<i className="fa fa-user"><a></a></i></Link></MenuItem>
                    <MenuItem eventKey="2">Settings &nbsp;<i className="fa fa-cog"><a></a></i></MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="3"><Link to='/logout'>Logout &nbsp;<i className="fa fa-window-close"><a></a></i></Link></MenuItem>
                  </NavDropdown>
                </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      );
    }
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    profile: state.user.profile,
  };
}

export default connect(mapStateToProps, {fetchUser})(HeaderTemplate);
