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
            <h1>Article</h1>
          </article>
          <aside className="article-aside--aside">
            <i>aside</i>
          </aside>
        </div>
        <footer className="article-aside--footer">
          <div className="article-aside--footer--banner">
            <p>footer</p>
          </div>
        </footer>
      </section>
    )
  }
}

export default ArticleAside;