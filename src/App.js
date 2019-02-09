import React, { Component } from "react";
import "./App.css";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import Konva from "konva";
import Item from "./Item";
import Truck from "./Truck";
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

const items = [];
const truck = new Truck(2 * 240, 2 * 96, 2 * 84, items);
const item = new Item(100, 100, 100, 10, 10, 10, "item", true);
items.push(item);
const INCH_TO_PIXEL = 5;
const inventory = [];

class App extends Component {
  state = {
    truck: truck,
    items: items,
    inventory: inventory
  };

  updateItem = (i, newX, newY) => {
    const newState = [...this.state.items];
    const oldItem = newState[i];
    console.log("newState", newState);
    console.log("oldItem", oldItem);
    const newItem = new Item(
      oldItem.length,
      oldItem.width,
      oldItem.height,
      newX,
      newY,
      oldItem.z,
      oldItem.name,
      oldItem.stackable
    );
    newState[i] = newItem;
    this.setState({ items: newState });
  };

  handleTruckSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const w = Number(form.elements[1].value);
    const h = Number(form.elements[2].value);
    const l = Number(form.elements[0].value);
    const newTruck = new Truck(
      INCH_TO_PIXEL * l,
      INCH_TO_PIXEL * w,
      INCH_TO_PIXEL * h,
      []
    );
    this.setState({ truck: newTruck });
  }

  handleItemSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements[0].value;
    const l = Number(form.elements[1].value);
    const w = Number(form.elements[2].value);
    const h = Number(form.elements[3].value);
    const newItem = new Item(
      INCH_TO_PIXEL * l,
      INCH_TO_PIXEL * w,
      INCH_TO_PIXEL * h,
      20,
      20,
      0,
      name,
      false
    );
    const newState = [...this.state.items, newItem];
    this.setState({ items: newState });
  }

  render() {
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
            <Col md={8} className="truck">
              <Card>
                <Card.Header as="h5">Truck</Card.Header>
                <Card.Body>
                  <Truck_stage
                    truck={this.state.truck}
                    items={this.state.items}
                    updateItem={this.updateItem}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="dims">
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
                        <Button variant="primary" type="submit" block>
                          Add Item
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="remitem">
                <Card.Header as="h5">Remove Item</Card.Header>
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
                        <Button variant="danger" type="submit" block>
                          Remove Item
                        </Button>
                      </Col>
                    </Row>
                  </Form>
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
