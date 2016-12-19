import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArticles } from '../actions/index';

class NewsSourceList extends Component {
  componentWillMount() {
    this.props.fetchArticles('the-new-york-times');
  }

  renderList() {
    return this.props.sources.map((source) => {
      return (
        <li
          className="list-group-item news-source-list-item"
          onClick={() => { this.props.fetchArticles(source.id) }}
          key={source.id}>
          {source.name}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <ul className= "list-group col-md-2">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    sources: state.sources
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArticles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSourceList);
