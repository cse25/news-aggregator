import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Panel, PanelGroup, Badge } from 'react-bootstrap';
import { fetchArticles } from '../actions/index';

class NewsSourceList extends Component {
  componentWillMount() {
    this.props.fetchArticles('the-new-york-times');
  }

  renderList(source) {
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

  renderCategories() {
    const categories = [
      { header: 'General', data: this.props.generalSources },
      { header: 'Technology', data: this.props.technologySources },
      { header: 'Sports', data: this.props.sportSources },
      { header: 'Business', data: this.props.businessSources },
      { header: 'Science and Nature', data: this.props.scienceAndNatureSources },
      { header: 'Gaming', data: this.props.gamingSources },
      { header: 'Entertainment', data: this.props.entertainmentSources },
      { header: 'Music', data: this.props.musicSources }
    ];

    return categories.map((category) => {
      return (
        <Panel 
          key={category.header}
          className="news-source-list-item" 
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
            {this.renderList(category.data)}
          </ListGroup>
        </Panel>
      )
    })
  }

  render() {
    return (
      <div className="col-md-3">
        <PanelGroup>
          {this.renderCategories()}
        </PanelGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    sources: state.sources,
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
