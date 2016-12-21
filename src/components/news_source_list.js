import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../actions/index';

class NewsSourceList extends Component {
  componentWillMount() {
    this.props.fetchArticles('the-new-york-times');
  }

  renderList(source) {
    return source.map((item) => {
      return (
        <li
          className="list-group-item news-source-list-item"
          onClick={() => { this.props.fetchArticles(item.id) }}
          key={item.id}>
          {item.name}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <ul className="accordion list-group col-md-2">
          <b className="list-group-item news-source-header">
            General 
            <span>({this.props.generalSources.length})</span>
          </b>
          {this.renderList(this.props.generalSources)}
          <b className="list-group-item news-source-header">
            Technology
            <span>({this.props.technologySources.length})</span>
          </b>
          {this.renderList(this.props.technologySources)}
        </ul>
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
