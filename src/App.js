import React, {
  Component
} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import ArticleContainer from './components/ArticleContainer';
import config from './config.js';

class App extends Component {
  constructor() {
    super();
    //  Initial State Properties
    this.state = {
      articles: [],
      asides: [],
      config: config,     //  Set current config in state from an imported config file
      fetches: 0,         //  Current Api Fetches
      totalFetches: 1000, //  Total Api Fetches until total window reload 
    }
    //  Set the document title / Browser tab text
    window.document.title = this.state.config.applicationName;
    console.log("WpInfoDisplay//Current Version: "+this.state.config.version.number);
  }

  componentDidMount = () => {
    //  Get Articles when component have mounted
    //  getArticles() will update state if successfull
    this.getArticles(this.state.config.wpApiUrl);
  }

  //  Checks if client has Internet Connection. Returns true or falls.
  hasInternet = () => {
    axios
      .get(window.location.href)
      .then(response => {
        // Has Internet
        return true;
      })
      .catch(error => {
        // Does not have Internet
        console.log("Client does not have internet connection.");
        console.log(error);
        return false;
      });
  }

  // Async Api Call using Axios to talk with Wordpress Api
  getArticles = (url) => {
    axios
      .get(url)
      .then(response => {
        //  Checks if the response array is not empty
        if (response.data.length > 0) {
          //  Filter response.data array for any objects thats follows the right arguments to being an Aside Article.
          // let filteredAsides = this.findAsideArticle(response.data);
          //  Find an Aside articles in response.data and REMOVE it.
          this.setState({
            articles: this.filterWpArrayByCategory(response.data, "Article"),
            asides: this.filterWpArrayByCategory(response.data, "Aside"),
          });
          if(this.state.asides.length > 0){
            // console.log(this.state.asides);
          }
        } else {
          //  If array is empty, refetch from api
          console.log("array is empty");
          this.handleRefetchWithTimeout(url, 10000);
        }
      })
      .catch(error => {
        console.log(error);
        this.handleRefetchWithTimeout(url, 10000);
      });
  }

  //  Filter out Articles by Category Name
  filterWpArrayByCategory = (array, categoryName) => {
    let copy = [...array];
    let filterArray = copy.filter(x => x._embedded['wp:term'][0][0].name == categoryName);
    if (filterArray.length > 0) {
      console.log("Found object with Category: "+categoryName);
      return filterArray;
    } else {
      console.log("Did not find object with Category: "+categoryName);
      // console.log(filterArray)
      return copy;
    }
  }

  // ////////////////////////Fetches//////////////////////// //
  //  Fetches API after x amount of time
  handleRefetchWithTimeout = (url, timeout) => {
    console.log("Could not fetch API, will reFetch in: "+timeout+"ms");
    setInterval(
      this.getArticles(url),
      timeout);
  }

  handleReFetch = () => {
    //  If the application have had x amount of fetches, reload the page (Solves: If new sourcecode have been remotely updated on the server, reload)
    if(this.state.fetches % 10 == 0){
      console.log("Full fetch cycles until reload: "+this.state.fetches+" / "+this.state.totalFetches);
    }
    if (this.state.fetches === this.state.totalFetches) {
      // Check internetconection
      if (this.hasInternet) {
        //  Client has Internet Conection. Reload location.
        console.log("reloading, has internet");
        window.location.reload();
      }
      else {
        // Has no Internetconection. Reset fetches so application will try again later when state.totalFetches has been met.
        console.log("Will not reload. Resetting..")
        this.setState({
          fetches: 0,
        });
      }
    } else {
      this.refetchArticles(this.state.config.wpApiUrl);
    }
  }

  //  This function will fetch the api and then compare the current api response to the recently fetched api response.
  refetchArticles = (url) => {
    axios
      .get(url)
      .then(response => {
        if (_.isEqual(response.data, this.state.articles)) {
          //  Both Arrays are equal, do nothing
        } else {
          //  Arrays are not equal, refresh state to new updated array
          this.setState({
            articles: this.filterWpArrayByCategory(response.data, "Article"),
            asides: this.filterWpArrayByCategory(response.data, "Aside"),
          });
        }
        //  Increases the state.fetches by 1
        this.setState({
          fetches: this.state.fetches + 1,
        });
      })
      .catch(error => {
        console.log(error);
        this.handleRefetchWithTimeout(url, 10000);
      });
  }

  render() {
    return (
      this.state.articles.length > 0 ?
        <div>
          <ArticleContainer articles={this.state.articles} asides={this.state.asides} settings={this.state.config.settings} handleReFetch={this.handleReFetch} placeholder={this.state.config.placeholder} />
        </div>
        :
        <div className="application__loading">
          <div className="application__loading__container">
            <div className="spinner">
              <div className="cube1"></div>
              <div className="cube2"></div>
            </div>
            <p className="application__loading__text">Loading<br/>{this.state.config.applicationName}</p>
          </div>
          <div className="application__loading__author">
            <p className="application__loading__author--text">Created by Christopher Kilinc<br/>(+46)73-664 72 93<br/>chriskilinc.com</p>
          </div>
          
          {/*<h1>Loading.. {this.state.applicationName}<br /><i>Fetching from api</i></h1>*/}
        </div>
    );
  }
}

export default App;