import React, { Component } from "react";
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
import Truck from "./Truck";

const INCH_TO_PIXEL = 5;

export default class Dims extends React.Component {
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

  render() {
    return (
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
    );
  }
}
