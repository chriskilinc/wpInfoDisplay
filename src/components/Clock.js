import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  constructor(props){
    super(props);
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
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
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
