import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Tag, Label } from "react-konva";

class TruckD extends Component {
  state = {
    color: "#eeeeee"
  };
  render() {
    const { truck, scale } = this.props;
    return (
      <Rect
        x={0}
        y={0}
        width={truck.width*scale}
        height={truck.length*scale}
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
      truck,
      scale
    } = this.props;
    return (
        <Label
          x={item.x*scale}
          y={item.y*scale}
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
            selectItem();
          }}
          dragBoundFunc={pos => {
            const newX =
              pos.x/scale > truck.width - item.width
                ? (truck.width - item.width)*scale
                : pos.x < 0
                ? 0
                : pos.x;

            const newY =
              pos.y/scale > truck.length - item.length
                ? (truck.length - item.length)*scale
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
            width={item.width*scale}
            height={item.length*scale}
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
      selectedIndex,
      scale
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
        scale={scale}
      />
    ));

    return (
      <Stage width={truck.width*scale} height={truck.length*scale}>
        <Layer>
          <TruckD truck={truck} scale={scale} />
          {itemComponents}
        </Layer>
      </Stage>
    );
  }
}
