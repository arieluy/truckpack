
import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
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
import { myState } from "./New";

var truckpack = require("truckpack");

const INCH_TO_PIXEL = 5;
const ITEM_COL = "#33b5e5";
var DOWNLOAD_LINK = "#";


class App extends Component {

  constructor(props) {
    super(props);
    // init manager
    this.manager = new truckpack.ItemManager(2 * 240, 2 * 96, 2 * 84);
    // add first item
    let firstItem = new truckpack.Item("item", 100, 100, 100, 10, 10, "grey", true);
    this.manager.addItem(firstItem);
    // initialize frontend state
    this.state = {
      collidesList: [false],
      stacks: [],
      inventory: [],
      selectedIndex: 0,
      items: [],
      truckDims: [2*240, 2*96, 2*84]
    };
  }

  updateItem(i, newX, newY){
    // move the item
    this.manager.moveItemAtIndex(index, newX, newY);
    // update visuals
    this.setState({ collidesList: this.manager.collidesList,
                    selectedIndex: i,
                    items: this.manager.itemList });
  };

  handleTruckSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const w = Number(form.elements[1].value);
    const h = Number(form.elements[2].value);
    const l = Number(form.elements[0].value);

    this.manager.updateTruckDims(w, l, h);
    this.setState({ truckDims: [l, w, h] });
  }

  handleItemSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements[0].value;
    const l = Number(form.elements[1].value);
    const w = Number(form.elements[2].value);
    const h = Number(form.elements[3].value);
    const color = form.elements[4].value;
    const newItem = new Item(
      INCH_TO_PIXEL * l,
      INCH_TO_PIXEL * w,
      INCH_TO_PIXEL * h,
      20,
      20,
      0,
      name,
      color,
      false
    );
    const newState = [...this.state.inventory, newItem];
    this.setState({ inventory: newState });
  }

  handleItemRemove(event) {
    event.preventDefault();
    const newState = [...this.state.items];
    newState.splice(this.state.selectedIndex, 1);
    this.setState({ items: newState });
  }

  handleItemRotate(event) {
    event.preventDefault();
    const newState = [...this.state.items];
    const oldItem = newState[this.state.selectedIndex];
    const newItem = new Item(
      oldItem.width,
      oldItem.length,
      oldItem.height,
      oldItem.x,
      oldItem.y,
      oldItem.z,
      oldItem.name,
      oldItem.color,
      oldItem.stackable
    );
    newState[this.state.selectedIndex] = newItem;
    this.setState({ items: newState });
  }

  handleStack(event) {
    event.preventDefault();
    const newState = [...this.state.items];
    var selInd = this.state.selectedIndex;
    const item1 = newState[selInd];
    var item2 = item1;
    for (let i = 0; i < newState.length; i++) {
      if (!(i === selInd)) {
        const r1 = item1;
        const r2 = newState[i];
        if (this.intersect(r1, r2)) {
          item2 = r2;
          var index2 = i;
          break;
        }
      }
    }
    if (item1 !== item2 && index2 !== undefined) {
      console.log("stacking!");
      const stackItem = new Item(
        Math.max(item1.length, item2.length),
        Math.max(item1.width, item2.width),
        item1.height + item2.height,
        item2.x,
        item2.y,
        item2.z,
        item1.name + "+" + item2.name,
        item1.color,
        false
      );
      const newStack = new ItStack(item1.name + "+" + item2.name, item1, item2);
      const newStackState = [...this.state.stacks, newStack];
      if (selInd > index2) {
        newState.splice(selInd, 1);
        newState.splice(index2, 1);
      } else {
        newState.splice(index2, 1);
        newState.splice(selInd, 1);
      }

      this.setState({ stacks: newStackState, items: [...newState, stackItem] });
    }
  }

  handleUnstack(event) {
    event.preventDefault();
    const oldItemState = [...this.state.items];
    const itemToRemove = oldItemState[this.state.selectedIndex];
    if (itemToRemove !== undefined) {
      const nameToRemove = itemToRemove.name;
      const newX = itemToRemove.x;
      const newY = itemToRemove.y;
      oldItemState.splice(this.state.selectedIndex, 1);
      const oldStackState = [...this.state.stacks];
      for (let i = 0; i < oldStackState.length; i++) {
        const stackItem = oldStackState[i];
        if (stackItem.name === nameToRemove) var index = i;
      }
      if (index !== undefined) {
        const stackIt = oldStackState[index];

        const newIt1 = this.moveItem(
          stackIt.item1,
          itemToRemove.x,
          itemToRemove.y
        );
        const newIt2 = this.moveItem(
          stackIt.item2,
          itemToRemove.x,
          itemToRemove.y
        );
        const newItemState = [...oldItemState, newIt1, newIt2];
        oldStackState.splice(index, 1);
        this.setState({ stacks: oldStackState, items: newItemState });
      }
    }
  }

  handleFileSave(event) {
    event.preventDefault();
    var json = JSON.stringify(this.state);
    json = json.replace(/\"([^(\")"]+)\":/g, "$1:");
    json = "const myState =" + json + "\nexport {myState};";
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    DOWNLOAD_LINK = url;
  }

  handleFileLoad(event) {
    event.preventDefault();
    this.setState(myState);
  }

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
              <Card className="additem">
                <Card.Header as="h5">Add Item</Card.Header>
                <Card.Body>
                  <Form onSubmit={e => this.handleItemSubmit(e)}>
                    <Row>
                      <Col>
                        <Form.Group controlId="itemName">
                          <Form.Control type="input" placeholder="Name" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="itemL">
                          <Form.Control type="input" placeholder="L" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="itemW">
                          <Form.Control type="input" placeholder="W" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="itemH">
                          <Form.Control type="input" placeholder="H" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="itemColor">
                          <label>
                            Color:
                            <select
                              value={this.state.value}
                              onChange={this.handleChange}
                            >
                              <option value="grey">Grey</option>
                              <option value="orange">Orange</option>
                              <option value="green">Green</option>
                              <option value="cyan">Blue</option>
                              <option value="purple">Purple</option>
                              <option value="white">White</option>
                            </select>
                          </label>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button variant="primary" type="submit" block>
                          Add Item
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="truck">
              <Card>
                <Card.Header as="h5">Truck</Card.Header>
                <Card.Body>
                  <Truck_stage
                    truck={this.state.truck}
                    items={this.state.items}
                    selectItem={(i) => this.setState{selectedIndex: i}}
                    updateItem={this.updateItem}
                    selectedIndex={this.state.selectedIndex}
                    collidesList={this.state.collidesList}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="dims">
              <Card>
                <Card.Header as="h5">Truck Dimensions</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form onSubmit={e => this.handleTruckSubmit(e)}>
                      <Row>
                        <Col>
                          <Form.Group controlId="truckL">
                            <Form.Label>Length</Form.Label>
                            <Form.Control type="input" placeholder="L" />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="truckW">
                            <Form.Label>Width</Form.Label>
                            <Form.Control type="input" placeholder="W" />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="truckH">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="input" placeholder="H" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button variant="primary" type="submit" block>
                            Enter
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="moditem">
                <Card.Header as="h5">Modify Item</Card.Header>

                <Card.Body>
                  <Form onSubmit={e => this.handleItemRotate(e)}>
                    <Row>
                      <Col>
                        <Button variant="primary" type="submit" block>
                          Rotate Item
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Body>
                  <Form onSubmit={e => this.handleStack(e)}>
                    <Row>
                      <Col>
                        <Button variant="primary" type="submit" block>
                          Stack
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Body>
                  <Form onSubmit={e => this.handleUnstack(e)}>
                    <Row>
                      <Col>
                        <Button variant="primary" type="submit" block>
                          Unstack
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
                <Card.Body>
                  <Form onSubmit={e => this.handleItemRemove(e)}>
                    <Row>
                      <Col>
                        <Button variant="danger" type="submit" block>
                          Remove Item
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header as="h5">File Save/Load</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form onSubmit={e => this.handleFileSave(e)}>
                      <Row>
                        <Col>
                          <Button variant="primary" type="submit" block>
                            Generate File
                          </Button>
                          <a href={DOWNLOAD_LINK}>Download File</a>
                        </Col>
                      </Row>
                    </Form>
                    <Form onSubmit={e => this.handleFileLoad(e)}>
                      <Row>
                        <Col>
                          <Button variant="primary" type="submit" block>
                            Load File
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
