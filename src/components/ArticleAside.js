import React from 'react';
import '../gutenberg.css';
import './ArticleAside.css';

import Clock from './Clock';

class ArticleAside extends React.Component {
  //  Looks for an "featuredmedia" / background Image on the Current Article
  //  If none is found, add a placehodler image
  checkBackgroundImageStatus = () => {
    if (this.props.currentArticle._embedded['wp:featuredmedia'] == null) {
      this.props.currentArticle._embedded['wp:featuredmedia'] = [{ source_url: this.props.placeholder.image }];
    }
  }

  render() {
    this.checkBackgroundImageStatus();
    return (
      <section className="article-aside">
        <div className="article-aside__container">
          <article className="article-aside__article" style={{
            backgroundImage: `url(${this.props.currentArticle._embedded['wp:featuredmedia'][0].source_url})`,
          }}>
            <div className="article-aside__article__container">
              <h1>{this.props.currentArticle.title.rendered}</h1>
              <p dangerouslySetInnerHTML={{ __html: this.props.currentArticle.content.rendered }}></p>
            </div>
          </article>
          <aside className="article-aside__aside">
            <div className="article-aside__aside__container">
              <div className="article-aside__clock">
                <Clock date={true} lang={'swe-SWE'}/>
              </div>
              <div className="article-aside__aside-article">
                <div className="article-aside__aside-article__container">
                  <h1>{this.props.aside.title.rendered}</h1>
                  <p dangerouslySetInnerHTML={{ __html: this.props.aside.content.rendered }}></p>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <footer className="article-aside__footer">
          <div className="article-aside__footer__banner">
            <img src="http://touch.tvostra.se/wp-content/uploads/2018/04/ostra_touch_topnav-1.png" />
          </div>
        </footer>
      </section>
    )
  }
}

export default ArticleAside;