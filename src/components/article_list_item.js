import React from 'react';

const ArticleListItem = (props) => {
  const { title, description, url, urlToImage, publishedAt } = props
  
  return (
    <div className="list-group-item article-list col-md-10">
      <h3>
        {title}
      </h3>
      <hr></hr>
      <div>
        <div className="row">
          <div className="col-md-6">
            {description}
            <div>
              <a href={url} target="_blank">Source</a>
              <div>
                <small>{publishedAt}</small>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img className="img-thumbnail img-fluid" src={urlToImage} />
          </div>
        </div>
      </div>
    </div>       
  )
};

export default ArticleListItem;
