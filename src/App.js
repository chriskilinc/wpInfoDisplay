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

    //  Initial State Properties
    this.state = {
      articles: [],
      asides:[],
      wpApiUrl: "http://sgy.chriskilinc.com/wp-json/wp/v2/posts?_embed",  //  Wordpress REST API url
      applicationName: "Signage",   // Application name, this will also be the browser tab title
      settings: {
        cycleInSeconds: 7.5,  //  The amount of time an item will show before changing to the next in que
        totalCycles: 1,       //  Total Number of cycles the gallery will run before fetching the Api
      },
      fetches: 0,         //  Current Api Fetches
      totalFetches: 1000, //  Total Api Fetches until total window reload 
    }
    //  Set the document title / Browser tab text
    window.document.title = this.state.applicationName;
  }

  componentDidMount = () => {
    //  Get Articles when component have mounted
    //  getArticles() will update state if successfull
    this.getArticles(this.state.wpApiUrl);

  }

  //  Checks if client has Internet Connection. Returns true or falls.
  hasInternet = () => {
    axios
      .get(window.location.href)
      .then(response => {
        // Has Internet
        console.log("has internet");
        return true;
      })
      .catch(error => {
        // Does not have Internet
        
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
            articles: this.cleanArticles(response.data),
            asides: this.findAsideArticle(response.data),
          });
        } else {
          //  If array is empty, refetch from api
          console.log("array is empty");
          this.handleRefetchWithTimeout(url, 10000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  findAsideArticle = (array) => {
    let copy = [...array];
    let aside = copy.filter(x => x.categories[0] > 1);
    // console.log(aside)
    return aside;
  }

  //  Remove ASIDE 
  cleanArticles = (array) => {
    return array;
  }
  //  Fetches API after x amount of time
  handleRefetchWithTimeout = (url, timeout) => {
    setInterval(
      this.getArticles(url),
      timeout);
  }

  handleReFetch = () => {
    //  If the application have had x amount of fetches, reload the page (Solves: If new sourcecode have been remotely updated on the server, reload)
    console.log(this.state.fetches)
    if (this.state.fetches === this.state.totalFetches) {
      
      // Check internetconection
      if(this.hasInternet){
        //  Client has Internet Conection. Reload location.
        console.log("reloading, has internet");
        window.location.reload();
      }
      else{
        // Has no Internetconection. Reset fetches so application will try again later when state.totalFetches has been met.
        console.log("Client does not have Internet Connecion. Will not reload.")
        this.setState({
          fetches: 0,
        });
      }
    } else {
      //console.log("Refetching");
      this.refetchArticles(this.state.wpApiUrl);
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
            articles: this.cleanArticles(response.data),
            asides: this.findAsideArticle(response.data),
          });
        }
        //  Increases the state.fetches by 1
        this.setState({
          fetches: this.state.fetches +1,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    return ( 
      this.state.articles.length > 0 ?
      <div>
        <ArticleContainer articles={this.state.articles} asides={this.state.asides} settings={this.state.settings} handleReFetch={this.handleReFetch}/>
      </div>
      :
      <div className="application__loading">
        <p>Loading.. {this.state.applicationName}<br /><i>Fetching from api</i></p>
      </div>
      
    );
  }
}

export default App;