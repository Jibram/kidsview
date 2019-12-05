import React from 'react';
import './App.css';

import LandingPage from './components/LandingPage'
import Test from './components/Test'
import AdminPage from './components/AdminPage'

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        patient: false,
        doctor: false
    }
  }

  componentDidMount(){
    if( getCookie("state") == "patient_done"){
      this.setState({patient:true,doctor:false})
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

export default App;
