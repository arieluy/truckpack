import React, { Component } from "react";
import PropTypes from "prop-types";
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
import Item from "./Item";

const INCH_TO_PIXEL = 5;

export default class Items extends Component {
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
    const newState = [...this.props.state.inventory, newItem];
    this.props.updateInventory(newState);
  }

  render() {
    return (
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
                    //value={this.state.value}
                    //onChange={this.handleChange}
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
    );
  }
}

Items.propTypes = {
  state: PropTypes.object.isRequired,
  updateInventory: PropTypes.func.isRequired
};
