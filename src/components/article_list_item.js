import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, url, urlToImage, publishedAt } = this.props
    return (
      <div className="list-group-item article-list col-md-9">
        <h3>
          {title}
        </h3>
        <hr></hr>
        <div>
          <div className="col-md-6">
            {description}
          </div>
          <div className="source-and-timestamp">
              <a href={url} target="_blank">{this.props.selectedSource}</a>
              <div>
                <small>{publishedAt}</small>
              </div>
            </div>
          <div className="col-md-6">
            <img className="img-thumbnail img-fluid" src={urlToImage} />
          </div>
        </div>
      </div>       
    )
  }
};

function mapStateToProps(state) {
  return {
    selectedSource: state.selectedSource
  }
}

export default connect(mapStateToProps)(ArticleListItem);
