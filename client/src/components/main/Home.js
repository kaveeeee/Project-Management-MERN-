// Home.js
import React, { Component } from 'react';
import HomeImage from './images/home.PNG';
import './Home.css'; // Import your CSS file for styling
import NotificationView from '../admin/NotificationView';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="left">
          {/* Image goes here */}
          <img src={HomeImage} alt="Your Image" />
        </div>
        <div className="right">
         
          {/* <p>This is a paragraph.</p>
          <p>This is another paragraph.</p> */}
          <NotificationView/>
          

        </div>
      </div>
    );
  }
}
