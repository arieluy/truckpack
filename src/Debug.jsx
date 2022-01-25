import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import PropTypes from "prop-types";

export default class Debug extends Component {
  
  handlePrintState(event) {
    event.preventDefault();
    console.log(this.props.state);
  }

  handlePrintItemManager(event) {
    event.preventDefault();
    console.log(this.props.itemManager);
  }

  render() {
    return (
      <Card className="debug">
        <Card.Header as="h5">Debug</Card.Header>

        <Card.Body>
          <Form onSubmit={e => this.handlePrintState(e)}>
            <Row>
              <Col>
                <Button variant="primary" type="submit" block>
                  Print State
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        <Card.Body>
          <Form onSubmit={e => this.handlePrintItemManager(e)}>
            <Row>
              <Col>
                <Button variant="primary" type="submit" block>
                  Print Item Manager
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

Debug.propTypes = {
  state: PropTypes.object.isRequired,
  itemManager: PropTypes.object.isRequired
};
