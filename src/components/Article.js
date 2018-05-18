import React from 'react';
import '../gutenberg.css';


class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  checkBackgroundImageStatus = () => {
    if (this.props.currentArticle._embedded['wp:featuredmedia'] == null) {
      this.props.currentArticle._embedded['wp:featuredmedia'] = [{ source_url: this.props.placeholder.image }];
    }
  }

  render() {
    this.checkBackgroundImageStatus();
    return (

      <article className="wp-article" style={{
        backgroundImage: `url(${this.props.currentArticle._embedded['wp:featuredmedia'][0].source_url})`,
      }}>
        <div className="wp-article__content">
          <div className="wp-article__content--padding">
            <p dangerouslySetInnerHTML={{ __html: this.props.currentArticle.content.rendered }}></p>
          </div>
        </div>
        <div className="wp-article__footer">
          <div className="wp-article__footer--padding">
            <h1>{this.props.currentArticle.title.rendered}</h1>
          </div>
        </div>
      </article>

    )
  }
}

export default Article;