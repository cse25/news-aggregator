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
    return (
      <Navbar>
        <Link to="/" className="navbar-brand">Sad Story Inc.</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
