import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import Item from "./Item";
import Truck from "./Truck";
import ItStack from "./ItStack";
import Truck_stage from "./Truck_stage";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";

import Items from "./Items";
import Files from "./Files";
import Dims from "./Dims";
import ModifyItem from "./ModifyItem";
import PropTypes from "prop-types";

const ITEM_COL = "#33b5e5";

const items = [];
const truck = new Truck(2 * 240, 2 * 96, 2 * 84, items);
const item = new Item(100, 100, 100, 10, 10, 10, "item", "grey", true);
items.push(item);
const inventory = [];
const collidesList = [false];
const stacks = [];

class App extends Component {
  state = {
    truck: truck,
    items: items,
    selectedIndex: 0,
    collidesList: collidesList,
    inventory: inventory,
    stacks: stacks
  };

  intersect = (r1, r2) => {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.length ||
      r2.y + r2.length < r1.y
    );
  };

  moveItem = (oldItem, newX, newY) => {
    return new Item(
      oldItem.length,
      oldItem.width,
      oldItem.height,
      newX,
      newY,
      oldItem.z,
      oldItem.name,
      oldItem.color,
      oldItem.stackable
    );
  };

  selectItem = i => {
    this.setState({ selectedIndex: i });
  };

  updateItem = (i, newX, newY) => {
    const newState = [...this.state.items];
    const oldItem = newState[i];
    const newItem = this.moveItem(oldItem, newX, newY);
    newState[i] = newItem;
    this.setState({ items: newState, selectedIndex: i });
    const newCollidesList = [...this.state.collidesList].map(it => false);
    for (let k = 0; k < newState.length; k++) {
      for (let j = 0; j < newState.length; j++) {
        if (!(k === j)) {
          const r1 = newState[k];
          const r2 = newState[j];
          if (this.intersect(r1, r2)) {
            newCollidesList[j] = true;
            newCollidesList[k] = true;
            break;
          }
        }
      }
    }

    this.setState({ collidesList: newCollidesList });
  };

  render() {
    const inventoryComponents = this.state.inventory.map((it, i) => (
      <ListGroup.Item
        action
        href={"#" + i}
        onClick={() => {
          const newState = [...this.state.items, it];
          const newCollidesList = [...this.state.collidesList, false];

          this.setState({ items: newState, collidesList: newCollidesList });
        }}
      >
        {it.name}
      </ListGroup.Item>
    ));
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
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
              <Items state={this.state} setState={this.setState} />
            </Col>

            <Col md={6} className="truck">
              <Card>
                <Card.Header as="h5">Truck</Card.Header>
                <Card.Body>
                  <Truck_stage
                    truck={this.state.truck}
                    items={this.state.items}
                    selectItem={this.selectItem}
                    updateItem={this.updateItem}
                    selectedIndex={this.state.selectedIndex}
                    collidesList={this.state.collidesList}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="dims">
              <Dims />
              <ModifyItem />
              <Files />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
