import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArticleListItem from './article_list_item';

class ArticleList extends Component {
  renderList() {
    return this.props.articles.map((article) => {
      return (
        <ArticleListItem 
          key={article.title}
          title={article.title}
          description={article.description}
          publishedAt={article.publishedAt}
          url={article.url}
          urlToImage={article.urlToImage}
        />
      )
    })
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return { 
    articles: state.articles
  }
}

export default connect(mapStateToProps)(ArticleList);
