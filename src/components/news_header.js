import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const NewsHeader = () => (
  <Jumbotron>
    <h1 className="display-3">News Aggregator</h1>
    <p className="lead">Get the latest news from 60 sources.</p>
  </Jumbotron>
);

export default NewsHeader;
