import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from './article_list';
import NewsHeader from './news_header';
import NewsSourceList from './news_source_list';

class NewsDashboard extends Component {
  render() {
    return (
      <div>
        <NewsHeader />
        <NewsSourceList />
        <ArticleList />
      </div>
    )
  }
}

export default NewsDashboard;
