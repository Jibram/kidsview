import React from 'react';
import './App.css';

import LandingPage from './components/LandingPage'
import Test from './components/Test'
import AdminPage from './components/AdminPage'

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

export default App;
