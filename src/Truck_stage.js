import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import Item from "./Item";
import Truck from "./Truck";

class Truck_d extends React.Component {
  state = {
    color: "#eeeeee"
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
        stroke="black"
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
    const {
      item,
      selectItem,
      updateItem,
      selected,
      collides,
      items,
      truck
    } = this.props;
    return (
      <Group>
        <Rect
          x={item.x}
          y={item.y}
          width={item.width}
          height={item.length}
          fill={item.color}
          stroke={collides ? "red" : selected ? "yellow" : "black"}
          strokeWidth={collides ? 10 : 3}
          onClick={() => {
            selectItem();
          }}
          draggable
          onDragStart={() => {
            this.setState({
              isDragging: true
            });
          }}
          onDragEnd={e => {
            updateItem(e.target.x(), e.target.y());
            this.setState({
              isDragging: false
            });
          }}
          dragBoundFunc={pos => {
            const newX =
              pos.x > truck.width - item.width
                ? truck.width - item.width
                : pos.x < 0
                ? 0
                : pos.x;

            const newY =
              pos.y > truck.length - item.length
                ? truck.length - item.length
                : pos.y < 0
                ? 0
                : pos.y;

            return { x: newX, y: newY };
          }}
        />
        <Text
          text={item.name}
          x={item.x + item.width / 3}
          y={item.y + item.length / 3}
        />
      </Group>
    );
  }
}

export default class Truck_stage extends React.Component {
  render() {
    const {
      truck,
      items,
      selectItem,
      updateItem,
      collidesList,
      selectedIndex
    } = this.props;
    const itemComponents = items.map((it, i) => (
      <Item_d
        item={it}
        selected={i === selectedIndex}
        selectItem={() => selectItem(i)}
        updateItem={(newX, newY) => updateItem(i, newX, newY)}
        collides={collidesList[i]}
        items={items}
        truck={truck}
      />
    ));

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Truck_d truck={truck} />
          {itemComponents}
        </Layer>
      </Stage>
    );
  }
}
