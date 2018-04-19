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

  handleReFetch = () =>{
    console.log("Refetching");
    this.refetchArticles(this.state.wpApiUrl);
  }

  refetchArticles = (url) => {
    axios
      .get(url)
      .then(response => {
        if(_.isEqual(response.data, this.state.articles)){
          console.log("Equal, keeping state");
        }
        else{
          console.log("Not Equal, updating State");
          this.setState({
            articles: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  arraysEqual = (arr1, arr2) => {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
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