import React from 'react';

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
    console.log("Running Time: " + runningTime + "s " + "before reload");

  }
  cycle = () => {
    this.setState({
      articleIndexes: this.rotateArray(this.state.articleIndexes),
      activeIndex: this.state.articleIndexes[0],
      timesRendered: this.state.timesRendered + 1,
    });
    this.timesRendered(this.props.articles, this.state.timesRendered, this.props.settings.totalCycles)
  }

  createRange = (length) =>
    Array.from(Array(length).keys());

  rotateArray = (array) => {
    const copy = [...array];
    const firstElement = copy.shift();
    copy.push(firstElement);
    return copy;
  }

  timesRendered = (array, timesRendered, totalCycles) => {
    if (timesRendered > array.length * totalCycles) {
      this.setState({
        timesRendered: 0,
      });
      console.log("Should Refetch");
      this.props.handleReFetch();
    }
    else {

    }
  }
  secondsToMs = (sec) =>{
    const ms = sec * 1000;
    return ms;
  }

  render() {
    return (
      this.props.articles[this.state.activeIndex]._embedded['wp:featuredmedia'] != null ?
        <article className="wp-article" style={{
          backgroundImage: `url(${this.props.articles[this.state.activeIndex]._embedded['wp:featuredmedia'][0].source_url})`,
        }}>
          <div className="wp-article__content">
            <div className="wp-article__content--padding">
              <p dangerouslySetInnerHTML={{ __html: this.props.articles[this.state.activeIndex].content.rendered }}></p>
            </div>
          </div>
          <div className="wp-article__footer">
            <div className="wp-article__footer--padding">
              <h1>{this.props.articles[this.state.activeIndex].title.rendered}</h1>
            </div>
          </div>
        </article>
        :
        <article className="wp-article" style={{
          background:'black',
        }}>
          <div className="wp-article__content">
            <div className="wp-article__content--padding">
              <p dangerouslySetInnerHTML={{ __html: this.props.articles[this.state.activeIndex].content.rendered }}></p>
            </div>
          </div>
          <div className="wp-article__footer">
            <div className="wp-article__footer--padding">
              <h1>{this.props.articles[this.state.activeIndex].title.rendered}</h1>
              <i>background image not found</i>
            </div>
          </div>
        </article>
    )
  }
}

export default ArticleContainer;