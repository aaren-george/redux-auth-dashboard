import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions/auth';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import LoginForm from './login-new';

const form = reduxForm({
  form: 'login',
});

const renderEmailField = field => (
    <div>
      <input id="email" className="form-control" placeholder="E-mail address" {...field.input} />
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div id="login-form">
        <div> 
        </div>
          <div id="login-body">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div className="icon-addon addon-md">
            <Field name="email" className="form-control" placeholder="E-mail address" component={renderEmailField} type="text" />
          </div>
          <label></label>
          <div>
            <Field name="password" className="form-control" placeholder="Password" component="input" type="password" />
          </div>
          <label></label>
          <button type="submit" className="btn btn-primary">Login</button>
          <label></label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
