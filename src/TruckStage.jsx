import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Tag, Label } from "react-konva";

class TruckD extends Component {
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

class ItemD extends Component {
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
      truck
    } = this.props;
    return (
        <Label
          x={item.x}
          y={item.y}
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
        >
          <Tag 
            fill={item.color}
            stroke={collides ? "red" : selected ? "yellow" : "black"}
            strokeWidth={collides ? 10 : 3}
          />
          <Text
            width={item.width}
            height={item.length}
            text={item.name}
            align={"center"}
            verticalAlign={"middle"}
            // x={item.x + item.width / 3}
            // y={item.y + item.length / 3}
          />
        </Label>
    );
  }
}

export default class TruckStage extends Component {
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
      <ItemD
        key={i}
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
          <TruckD truck={truck} />
          {itemComponents}
        </Layer>
      </Stage>
    );
  }
}
