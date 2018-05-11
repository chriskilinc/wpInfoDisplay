import React, { Component } from 'react';
import './Clock.css';

/**
 * SETTINGS / PROPS
 * @param {bool} - date - Will the component return a Date? If true the current date will be returned as text
 * @param {string} - lang - Declares what language the Date will show in. 
 */
class Clock extends Component {
  constructor(props){
    super(props);

    if(this.props.lang == '' || null)
      this.props.lang = 'en-us'

    this.state = {
      time:new Date(),
    };
    this.currentDate = {
      full: new Date(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      year: new Date().getFullYear(),
      monthString: new Date().toLocaleString(this.props.lang, { month: 'long' }),
      date: new Date().getDate(),
      dayString: new Date().toLocaleString(this.props.lang, { weekday: 'long' }),
    }
  }

  componentDidMount() {
    //  Starts a timer when component did mount
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //  This is what happens every tick of the timer
  tick() {
    this.setState({
      time: new Date(), //  Sets the states time to new current time every tick
    });
  }

  render() {
    return (
      this.props.date ?
        <div className="clock">
          <h1>{this.state.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</h1>
          <p>{this.currentDate.dayString} {this.currentDate.date}, {this.currentDate.monthString}</p>
        </div>
        :
        <div className="clock">
          <h1>{this.state.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</h1>
        </div>
    );
  }
}

export default Clock;
