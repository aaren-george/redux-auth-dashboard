import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
  render() {
    const d = new Date();
    const year = d.getFullYear();
    if (this.props.authenticated) {
    
      return (
      
      <footer className="w3-light-grey">
        <div className="container-footer">
          <div className="row">
            <div className="col-lg-12">
              <nav id="footer" className="w3-xlarge w3-center w3-opacity">
                <i className="fa fa-facebook-official w3-hover-opacity"></i>
                <i className="fa fa-instagram w3-hover-opacity"></i>
                <i className="fa fa-twitter w3-hover-opacity"></i>
                <i className="fa fa-linkedin w3-hover-opacity"></i>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <div></div>
  );
}
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
