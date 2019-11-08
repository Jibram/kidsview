import React from 'react';
import './App.css';

import LandingPage from './components/LandingPage'
import Test from './components/Test'
import AdminPage from './components/AdminPage'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LandingPage/>
          <Test/>
          <AdminPage/>
        </header>
      </div>
    )
  }
}

export default App;
