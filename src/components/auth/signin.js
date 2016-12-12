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
            <Field name="password" component="input" type="text" />
          </div>
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

export default connect(null, actions)(form(Signin));
