import React, { Component } from 'react';
import HeaderTemplate from './header';
import FooterTemplate from './footer';
import SidebarLeftPush from './sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Dashboard" />

        <div className="container">
          {this.props.children}
        </div>

        <FooterTemplate />
      </div>
    );
  }
}

export default App;
