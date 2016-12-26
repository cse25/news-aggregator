import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Panel, PanelGroup, Badge } from 'react-bootstrap';
import { fetchArticles } from '../actions/index';

class NewsSourceList extends Component {
  componentWillMount() {
    this.props.fetchArticles('the-new-york-times');
  }

  renderSources(source) {
    return source.map((item) => {
      return (
        <ListGroupItem
          className="news-source-list-item"
          onClick={() => { this.props.fetchArticles(item.id) }}
          key={item.id}>
          {item.name}
        </ListGroupItem>
      )
    })
  }

  renderFavorites() {
    const favorites = this.props.favorites.filter((item) => {
      return item.favorite === true;
    })
    
    if (favorites.length === 0) {
      return (
        <div className="add-favorites-message">
          <Link to="/favorites">
            You do not currently have any favorites.
            Click here to start adding some.
          </Link>
        </div>
      )
    }
   
    return (
      <Panel
        collapsible header={
        <div>
          Favorites
          <span className="news-source-badge">
            <Badge>
              {favorites.length}
            </Badge>
          </span>
        </div>}>
        <ListGroup>
          {this.renderSources(favorites)}
        </ListGroup>
      </Panel>
    )
  }

  renderCategories() {
    const categories = [
      { header: 'General', data: this.props.generalSources },
      { header: 'Technology', data: this.props.technologySources },
      { header: 'Business', data: this.props.businessSources },
      { header: 'Science and Nature', data: this.props.scienceAndNatureSources },
      { header: 'Sports', data: this.props.sportSources },
      { header: 'Gaming', data: this.props.gamingSources },
      { header: 'Entertainment', data: this.props.entertainmentSources },
      { header: 'Music', data: this.props.musicSources }
    ];

    return categories.map((category) => {
      return (
        <Panel 
          key={category.header}
          collapsible header={
          <div>
            {category.header}
            <span className="news-source-badge">
              <Badge>
                {category.data.length}
              </Badge>
            </span>
          </div>}>
          <ListGroup>
            {this.renderSources(category.data)}
          </ListGroup>
        </Panel>
      )
    })
  }

  render() {
    return (
      <div className="col-md-3">
        <PanelGroup>
          {this.renderFavorites()}
          {this.renderCategories()}
        </PanelGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    favorites: state.favorites,
    generalSources: state.generalSources,
    technologySources: state.technologySources,
    sportSources: state.sportSources,
    businessSources: state.businessSources,
    entertainmentSources: state.entertainmentSources,
    musicSources: state.musicSources,
    gamingSources: state.gamingSources,
    scienceAndNatureSources: state.scienceAndNatureSources
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSourceList);
