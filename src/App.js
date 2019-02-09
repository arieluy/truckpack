import React, { Component } from 'react';
import './App.css';
import Items from './Item';
import Truck from './Truck';

class App extends Component {
  render() {
    const items = [];
    const truck = new Truck(240,96,84,items);
    return (
      <div className="App">
        <header className="App-header">
            
        </header>
      </div>
    );
  }
}

export default App;
