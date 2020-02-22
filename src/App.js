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

import {Item, ItemManager} from "./truckpack";


class App extends Component {
  constructor(props) {
    super(props);

    this.itemManager = new ItemManager(2 * 96, 2 * 240, 2 * 84);
    const item = new Item("item", 100, 100, 100, 10, 10, "grey", true);
    this.itemManager.addItem(item)
    this.state = {
      renderedItems: [item],
      selectedIndex: 0,
      collidesList: [],
      inventory: { "item": item },
      truckDims: {width: this.itemManager.truckX,
                  length: this.itemManager.truckY,
                  height: this.itemManager.truckZ}
    };

    // Binding
    this.selectItem = this.selectItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.updateTruck = this.updateTruck.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.addItem = this.addItem.bind(this);

  }
  

  selectItem(i) {
    console.log("Select items");
    this.setState({ selectedIndex: i });
  }

  updateItem(i, newX, newY) {
    console.log("Update item");
    this.itemManager.updateItem(i, newX, newY);
    this.setState({ collidesList: this.itemManager.collidesList });
  }

  updateInventory(newItem) {
    console.log("UPdate inventory");
    this.itemManager.addItem(newItem);
    this.setState({ renderedItems: this.itemManager.itemList,
                    inventory: this.itemManager.inventory });
  };

  updateTruck(newTruck) {
    console.log("Update truck");
    this.itemManager.updateTruckDims(newTruck.width, 
                                newTruck.length, 
                                newTruck.height);
    this.setState({ truckDims:  this.itemManager.truckDims});
  }

  updateItems() {
    console.log("update items");
    this.setState({ renderedItems: this.itemManager.itemList });
  }

  addItem(item) {
    console.log("adding item");
    this.itemManager.addItem(item);
    this.setState({renderedItems: this.itemManager.itemList,
                   collidesList: this.itemManager.collidesList,
                   inventory: this.itemManager.inventory});
  }

  render() {
    var inventoryComponents = [];
    var count = 0;
    for (var itemName in this.state.inventory) {
     inventoryComponents.push(<ListGroup.Item
        action
        href={"#" + count}
        onClick={() => {
          this.addItem(this.state.inventory[itemName]);
        }}
      >
        {itemName}
      </ListGroup.Item>
      );
     count += 1;
    }
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
              <Card className="items">
                <Card.Header as="h5">Items</Card.Header>

                <Card.Body>
                  <ListGroup variant="flush">{inventoryComponents}</ListGroup>
                </Card.Body>
              </Card>
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
                moveItem={this.moveItem}
              />
              <Files state={this.state} setState={this.setState} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
