import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import Item from "./Item";
import Truck from "./Truck";

class Truck_d extends React.Component {
  state = {
    color: "#0074d9"
  };
  render() {
    const { truck } = this.props;
    return (
      <Rect
        x={0}
        y={0}
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
    const { item, updateItem } = this.props;
    console.log("items props", this.props);
    return (
      <Group>
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.length}
          fill={"#ff4136"}
          draggable
          onDragStart={() => {
            this.setState({
              isDragging: true
            });
          }}
          onDragEnd={e => {
            console.log("aaa", e);
            updateItem(e.target.x(), e.target.y());
            this.setState({
              isDragging: false
            });
          }}
        />
        <Text
          text={item.name}
          x={item.x + item.width / 2}
          y={item.y + item.length / 2}
        />
      </Group>
    );
  }
}

export default class Truck_stage extends React.Component {
  render() {
    const { truck, items, updateItem } = this.props;
    const itemComponents = items.map((it, i) => (
      <Item_d
        item={it}
        updateItem={(newX, newY) => updateItem(i, newX, newY)}
      />
    ));

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <Truck_d truck={truck} />
          {itemComponents}
        </Layer>
      </Stage>
    );
  }
}
