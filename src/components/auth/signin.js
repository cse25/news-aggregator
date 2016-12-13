import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const form = reduxForm({
  form: 'signin'
});

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    // sign user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <div className="form-control">
            <Field name="email" component="input" type="text" />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <div className="form-control">
            <Field name="password" component="input" type="password" />
          </div>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, actions)(form(Signin));
