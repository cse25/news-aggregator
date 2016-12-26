import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { toggleFavorite } from '../actions/index';

class Favorites extends Component {
  renderList() {
    return this.props.favorites.map((favorite) => {
      return (
        <ListGroupItem
          key={favorite.name}
          className="favorite-item">
          {favorite.name}
          <span><input 
            className="checkbox" 
            type="checkbox"
            onClick={() => this.props.toggleFavorite(favorite)} />
          </span>
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <div>
        Edit Favorites
        <ListGroup className="favorites-list">
          {this.renderList()}
        </ListGroup>
        <Button 
          bsStyle="primary"
          className="save-button">
          Save
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources,
    favorites: state.favorites
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleFavorite }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
