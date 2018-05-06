import React from 'react';
import '../gutenberg.css';
import './ArticleAside.css';

class ArticleAside extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <section className="article-aside">
        <div className="article-aside--container">
          <article className="article-aside--article">
            <div className="article-aside--article--container">
              <h1>Article</h1>
            </div>            
          </article>
          <aside className="article-aside--aside">
            <div className="article-aside--aside--container">
              <div className="article-aside--clock">
                <h1>00:00</h1>
                <p>04 Maj</p>
              </div>
              <div className="article-aside--aside-article">
                <h1>Title</h1>
                <p>Contents</p>
              </div>
            </div>
          </aside>
        </div>
        <footer className="article-aside--footer">
          <div className="article-aside--footer--banner">
            <img src="http://touch.tvostra.se/wp-content/uploads/2018/04/ostra_touch_topnav-1.png"/>
          </div>
        </footer>
      </section>
    )
  }
}

export default ArticleAside;