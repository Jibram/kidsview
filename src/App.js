import React from 'react';
import './App.css';
import Test from './components/Test'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Test/>
        </header>
      </div>
    )
  }
}

export default App;
