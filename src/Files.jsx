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
import { myState } from "./New";
import PropTypes from "prop-types";

var DOWNLOAD_LINK = "#";

export default class Files extends Component {
  handleFileSave(event) {
    event.preventDefault();
    var json = JSON.stringify(this.props.state);
    json = json.replace(/\"([^(\")"]+)\":/g, "$1:");
    json = "const myState =" + json + "\nexport {myState};";
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    DOWNLOAD_LINK = url;
  }

  handleFileLoad(event) {
    event.preventDefault();
    this.props.setState(myState);
  }

  render() {
    return (
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
    );
  }
}

Files.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
};
