import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import { toggleFavorite } from '../actions/index';

class Favorites extends Component {
  renderList() {
    return this.props.favorites.map((favorite) => {
      if (!favorite.favorite) {
        return (
          <ListGroupItem
            onClick={() => this.props.toggleFavorite(favorite)}
            key={favorite.name}
            className="favorite-item">
            {favorite.name}
          </ListGroupItem>
        )
      } else {
        return (
          <ListGroupItem
            onClick={() => this.props.toggleFavorite(favorite)}
            key={favorite.name}
            className="favorite-item">
            {favorite.name}
            <span className="float-right">
              <Glyphicon glyph="star" />
            </span>
          </ListGroupItem>
        )
      }
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
          className="float-right">
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
