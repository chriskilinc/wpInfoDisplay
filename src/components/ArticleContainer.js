import React from 'react';
import '../gutenberg.css';

import ArticleAside from '../components/ArticleAside';

class ArticleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleIndexes: this.createRange(props.articles.length),
      activeIndex: 0,
      timesRendered: 0,
    };
  }

  componentDidMount() {
    setInterval(() =>
      this.cycle(),
      this.secondsToMs(this.props.settings.cycleInSeconds));
    const runningTime = (this.props.settings.totalCycles * this.props.articles.length * this.props.settings.cycleInSeconds);
    console.log("Running Time: " + runningTime + "s before reload");

  }
  cycle = () => {
    this.setState({
      articleIndexes: this.rotateArray(this.state.articleIndexes),
      activeIndex: this.state.articleIndexes[0],
      timesRendered: this.state.timesRendered + 1,
    });
    this.timesRendered(this.props.articles, this.state.timesRendered, this.props.settings.totalCycles);
  }

  timesRendered = (array, timesRendered, totalCycles) => {
    //  If the total cycle time of te gallery is met, it is finished and should fetch the api and check for changes
    if (timesRendered > array.length * totalCycles) {
      this.setState({
        //  Reset the state of how many times the state have rendered
        timesRendered: 0,
      });
      //  Refetch api

      this.props.handleReFetch();
    }
    else {
    }
  }

  createRange = (length) =>
    Array.from(Array(length).keys());

  rotateArray = (array) => {
    const copy = [...array];
    const firstElement = copy.shift();
    copy.push(firstElement);
    return copy;
  }

  secondsToMs = (sec) => {
    //const ms = sec * 1000;
    return sec * 1000;
  }

  render() {
    return (
      // this.props.articles[this.state.activeIndex]._embedded['wp:featuredmedia'] != null ?
      //   <article className="wp-article" style={{
      //     backgroundImage: `url(${this.props.articles[this.state.activeIndex]._embedded['wp:featuredmedia'][0].source_url})`,
      //   }}>
      //     <div className="wp-article__content">
      //       <div className="wp-article__content--padding">
      //         <p dangerouslySetInnerHTML={{ __html: this.props.articles[this.state.activeIndex].content.rendered }}></p>
      //       </div>
      //     </div>
      //     <div className="wp-article__footer">
      //       <div className="wp-article__footer--padding">
      //         <h1>{this.props.articles[this.state.activeIndex].title.rendered}</h1>
      //       </div>
      //     </div>
      //   </article>
      //   :
      //   <article className="wp-article wp-article--nobg">
      //     <div className="wp-article__content">
      //       <div className="wp-article__content--padding">
      //         <p dangerouslySetInnerHTML={{ __html: this.props.articles[this.state.activeIndex].content.rendered }}></p>
      //       </div>
      //     </div>
      //     <div className="wp-article__footer">
      //       <div className="wp-article__footer--padding">
      //         <h1>{this.props.articles[this.state.activeIndex].title.rendered}</h1>
      //         {/*<i>featuredmedia not found</i>*/}
      //       </div>
      //     </div>
      //   </article>
      <ArticleAside currentArticle={this.props.articles[this.state.activeIndex]} aside={this.props.asides[0]} placeholder={this.props.placeholder} />
    )
  }
}

export default ArticleContainer;