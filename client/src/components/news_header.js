import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const NewsHeader = () => (
  <Jumbotron>
    <h1 className="display-3">News Aggregator</h1>
    <p className="lead">Powered by <a href="http://newsapi.org" target="_blank">newsapi.org</a></p>
  </Jumbotron>
);

export default NewsHeader;
