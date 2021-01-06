import React, { Component } from "react";
import "./App.css";
import TruckStage from "./TruckStage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
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
    this.itemManager = new ItemManager(92, 180, 86);
    const item = this.itemManager.newInputItem("item", 20, 15, 10, "grey", true);
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
      inventorySelected: "item",
      scale: 1
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
    this.loadInventory = this.loadInventory.bind(this);
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

  // eventually fix this so that colors list is a constant somewhere
  isValidColor(color) {
    return ["grey", "orange", "green", "cyan", "purple", "white"].indexOf(color) > -1;
  }

  loadInventory(inv) {
    for (let i = 0; i < inv.length; i++) {
      var it = inv[i];
      var color = it.length >= 5 && this.isValidColor(it[4]) ? it[4] : "grey";
      var item = this.itemManager.newInputItem(it[0], it[1], it[2], it[3], color, true);
      this.itemManager.createItem(item);
    }
    console.log(this.itemManager.inventory);
    this.setState({ inventory: this.itemManager.inventory});
  }

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

  setScale(newScale) {
    this.setState({scale:newScale})
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
                loadInventory={this.loadInventory}
              />
              <Items
                state={this.state}
                itemManager={this.itemManager}
                updateInventory={this.updateInventory}
              />
            </Col>

            <Col md={6} className="truck">
              <Card style={{height: "100vh"}}>
                <Card.Header as="h5">
                  <div style={{display:"flex"}}>
                    <div style={{flex:"1 1"}}>Truck</div>
                    <div style={{flex: "1 1", textAlign:"right"}}>
                      <Dropdown style={{display:"inline-block", flex:"1 1"}} onSelect={(scale) => this.setScale(scale)}>
                        <Dropdown.Toggle id="dropdown-basic">
                          Scale: {this.state.scale}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="0.25">0.25</Dropdown.Item>
                          <Dropdown.Item eventKey="0.5">0.5</Dropdown.Item>
                          <Dropdown.Item eventKey="1">1.0</Dropdown.Item>
                          <Dropdown.Item eventKey="1.5">1.5</Dropdown.Item>
                          <Dropdown.Item eventKey="2">2</Dropdown.Item>
                          <Dropdown.Item eventKey="3">3</Dropdown.Item>
                          <Dropdown.Item eventKey="5">5</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body style={{height: "calc(100% - 2.5rem)"}}>
                  <TruckStage
                    truck={this.state.truckDims}
                    items={this.state.renderedItems}
                    selectItem={this.selectItem}
                    updateItem={this.updateItem}
                    selectedIndex={this.state.selectedIndex}
                    collidesList={this.state.collidesList}
                    scale={this.state.scale}
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
