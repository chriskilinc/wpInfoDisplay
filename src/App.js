import React, {
  Component
} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import ArticleContainer from './components/ArticleContainer';

class App extends Component {
  constructor() {
    super();

    //  Initial State
    this.state = {
      articles: [],
      wpApiUrl: "http://smartgallery.chriskilinc.com/wp-json/wp/v2/posts?_embed",
      settings: {
        cycleInSeconds: 2,
        totalCycles: 1
      },
    }
  }

  componentDidMount = () => {
    //  Get Articles when component have mounted
    //  getArticles() will update state if successfull
    this.getArticles(this.state.wpApiUrl);
  }

  // Async Api Call using Axios to talk with Wordpress Api
  getArticles = (url) => {
    axios
      .get(url)
      .then(response => {
        this.setState({
          articles: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleReFetch = () => {
    console.log("Refetching");
    this.refetchArticles(this.state.wpApiUrl);
  }

  refetchArticles = (url) => {
    axios
      .get(url)
      .then(response => {
        if (_.isEqual(response.data, this.state.articles)) {
          //  Both Arrays are equal, do nothing
        }
        else {
          //  Arrays are not equal, refresh state to new array
          this.setState({
            articles: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    return ( 
      this.state.articles.length > 0 ?
      <div>
        <ArticleContainer articles={this.state.articles} settings={this.state.settings} handleReFetch={this.handleReFetch}/>
      </div>
      :
      <div className="application__loading">
        <p>Loading.. <br /><i>Fetching from api</i></p>
      </div>
    );
  }
}

export default App;