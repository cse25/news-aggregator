import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={0}>
          <Link to="/signout" className="nav-link">Sign out</Link>
        </li>,
        <li className="nav-item" key={1}>
          <Link to="/favorites">Edit Favorites</Link>
        </li>        
      ];
    } else {
      return [
        <li className="nav-item" key={0}>
          <Link to="/signin" className="nav-link">Sign in</Link>
        </li>,
        <li className="nav-item" key={1}>
          <Link to="/signup" className="nav-link">Sign up</Link>
        </li>
      ];
    }
  }

  render() {
    if (!this.props.email) {
      return (
        <Navbar inverse>
          <Link to="/dashboard" className="navbar-brand">News Aggregator</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
          <Navbar.Text className="nav-item email-header">
            {localStorage.email}
          </Navbar.Text>
        </Navbar>
      );
    } else {
      return (
        <Navbar inverse>
          <Link to="/dashboard" className="navbar-brand">News Aggregator</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
          <Navbar.Text className="nav-item email-header">
            {this.props.email}
          </Navbar.Text>
        </Navbar>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    email: state.auth.email
  }
}

export default connect(mapStateToProps)(Header);
