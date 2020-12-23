import React, { Component } from "react";
import "./App.css";
import TruckStage from "./TruckStage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";

import Items from "./Items";
import Files from "./Files";
import Dims from "./Dims";
import ModifyItem from "./ModifyItem";
import Inventory from "./Inventory";

import {Item, ItemManager} from "./truckpack";

class App extends Component {
  constructor(props) {
    super(props);
    // TODO where do these starting dims come from? @auy
    this.itemManager = new ItemManager(2 * 96, 2 * 240, 2 * 84);
    const item = new Item("item", 100, 70, 100, 10, 10, "grey", true);
    this.itemManager.createItem(item);
    this.itemManager.addItem(item);
    this.state = {
      renderedItems: [item],
      selectedIndex: 0,
      collidesList: [],
      truckDims: {width: this.itemManager.truckX,
                  length: this.itemManager.truckY,
                  height: this.itemManager.truckZ},
      inventory: {"item": item},
      inventorySelected: "item" 
    };

    // Binding - required to use functions throughout the program
    this.selectItem = this.selectItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.updateTruck = this.updateTruck.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.loadFile = this.loadFile.bind(this);
  }
  
  selectItem(i) {
    console.log("Selected item: " + i);
    this.setState({ selectedIndex: i });
  }

  updateItem(i, newX, newY) {
    console.log("Update item");
    this.itemManager.updateItem(i, newX, newY);
    this.setState({ collidesList: this.itemManager.collidesList });
  }

  updateInventory(newItem) {
    console.log("Update inventory");
    this.itemManager.createItem(newItem);
    this.setState({ inventory: this.itemManager.inventory});
  };

  updateTruck(newTruck) {
    console.log("Update truck");
    this.itemManager.updateTruckDims(newTruck.width, 
                                newTruck.length, 
                                newTruck.height);
    this.setState({ truckDims: {
        width: this.itemManager.truckX,
        length: this.itemManager.truckY,
        height: this.itemManager.truckZ
    }});
  }

  updateItems() {
    console.log("update items");
    this.setState({ renderedItems: this.itemManager.itemList,
                    collidesList: this.itemManager.collidesList });
  }

  createItem(item) {
    console.log("creating item");
    this.itemManager.createItem(item);
    this.setState({inventory: this.itemManager.inventory});
  }

  addItem(item) {
    console.log("adding item");
    this.itemManager.addItem(item);
    this.setState({renderedItems: this.itemManager.itemList,
                   collidesList: this.itemManager.collidesList});
  }

  loadFile(state, itemManager) {
    this.setState(state);
    this.itemManager = itemManager;
  }

  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"
        />
        <Navbar bg="light">
          <Navbar.Brand href="#home">Truck Packer</Navbar.Brand>
        </Navbar>
        <Container className="space">
          <Row>
            <Col md={3}>
              <Inventory
                state={this.state}
                updateItems={this.updateItems}
                itemManager={this.itemManager}
              />
              <Items
                state={this.state}
                updateInventory={this.updateInventory}
              />
            </Col>

            <Col md={6} className="truck">
              <Card>
                <Card.Header as="h5">Truck</Card.Header>
                <Card.Body>
                  <TruckStage
                    truck={this.state.truckDims}
                    items={this.state.renderedItems}
                    selectItem={this.selectItem}
                    updateItem={this.updateItem}
                    selectedIndex={this.state.selectedIndex}
                    collidesList={this.state.collidesList}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="dims">
              <Dims updateTruck={this.updateTruck} />
              <ModifyItem
                state={this.state}
                updateItems={this.updateItems}
                itemManager={this.itemManager}
              />
              <Files
                state={this.state} 
                itemManager={this.itemManager}
                loadFile={this.loadFile}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
