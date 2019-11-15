import React from 'react';
import './App.css';

import LandingPage from './components/LandingPage'
import Test from './components/Test'
import AdminPage from './components/AdminPage'

//Webgazer (Hoa)
//import webgazer from './webgazer';
//import main from './main';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        patient: false,
        doctor: false
    }
  }

  handlePatient = (e) => {
    this.setState({patient:true,doctor:false})
  }

  handleDoctor = (e) => {
    this.setState({patient:false,doctor:true})
  }

  viewSelect() {
    if (this.state.patient) {
      return <Test/>
    }
    else if (this.state.doctor) {
      return <AdminPage/>
    }
    else {
      return <LandingPage handlePatient={this.handlePatient} handleDoctor={this.handleDoctor}/>
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.viewSelect()}
        </header>
      </div>
    )
  }
}

window.onload = function() {
  //start the webgazer tracker
  webgazer.setRegression('ridge') /* currently must set regression and tracker */
      .setTracker('clmtrackr')
      .setGazeListener(function(data, clock) {
           console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
           console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
      })
      .begin()
      .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


  //Set up the webgazer video feedback.
  var setup = function() {

      //Set up the main canvas. The main canvas is used to calibrate the webgazer.
      var canvas = document.getElementById("plotting_canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
  };

  function checkIfReady() {
      if (webgazer.isReady()) {
          setup();
      } else {
          setTimeout(checkIfReady, 100);
      }
  }
  setTimeout(checkIfReady,100);
};

export default App;
