import React, { Component } from 'react';
import './App.css';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';
import Item from './Item';
import Truck from './Truck';

class Truck_d extends React.Component {
  state = {
    color: 'white'
  };
  render() {
    const {truck} = this.props;
    return (
      <Rect
        x={20}
        y={20}
        width={truck.width}
        height={truck.length}
        fill={this.state.color}
        onClick={this.handleClick}
      />
    );
  }
}

class Item_d extends React.Component {
  state = {
    isDragging: false 
  };
  render() {
    const {item} = this.props;
    console.log("items props", this.props);
    return (
      <>
      <Rect
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.length}
        fill={"grey"}
        draggable
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={() => {
          this.setState({
            isDragging: false
          });
        }} 
      />
      <Text
        text={item.name}
        x={item.x}
        y={item.y}
      />
      <> 
    );
  }
}

class App extends Component {
  state = {
    truckHeight: 0,
    truckWidth: 0,
    truckLength: 0,
    items: []
  };

  _ updateItems=(i, newItem)=> {
    newState = [...this.state.items];
    newState[i] = newItem;
    this.setState({items: newState})
  }

  render() {
    const items = [];
    const truck = new Truck(2*240,2*96,2*84,items);
    const item = new Item(100,100,100,10,10,10,"item",true);
    console.log("egg", item);
    items.push(item);
    const itemComponents = items.map(it=> <Item_d item={it}/>);
    console.log("Hello", itemComponents)
    return (
      <div className="App">
        <header className="App-header">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Text text="Try click on rect" />
              <Truck_d truck={truck}/>
              {itemComponents}
            </Layer>
          </Stage> 
        </header>
      </div>
    );
  }
}

export default App;
