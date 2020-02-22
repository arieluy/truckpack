import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import PropTypes from "prop-types";

export default class Dims extends Component {
  handleTruckSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const w = Number(form.elements[1].value);
    const h = Number(form.elements[2].value);
    const l = Number(form.elements[0].value);
    const newTruck = {width: w,
                     length: l,
                     height: h}
    this.props.updateTruck(newTruck);
  }

  render() {
    return (
      <Card>
        <Card.Header as="h5">Truck Dimensions</Card.Header>
        <Card.Body>
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
        </Card.Body>
      </Card>
    );
  }
}

Dims.propTypes = {
  updateTruck: PropTypes.func.isRequired
};
