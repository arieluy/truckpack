import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";

var DOWNLOAD_LINK = "#";

export default class Files extends Component {
  handleFileSave(event) {
    event.preventDefault();
    // var json = JSON.stringify(this.props.state);
    // json = json.replace(/\"([^(\")"]+)\":/g, "$1:");
    // json = "const myState =" + json + "\nexport {myState};";
    // var blob = new Blob([json], { type: "application/json" });
    // var url = URL.createObjectURL(blob);

    // DOWNLOAD_LINK = url;
    alert("Re-implement me!");
  }

  handleFileLoad(event) {
    event.preventDefault();
    alert("Re-implement me!");
    // this.props.setState(myState);
  }

  render() {
    return (
      <Card>
        <Card.Header as="h5">File Save/Load</Card.Header>
        <Card.Body>
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
        </Card.Body>
      </Card>
    );
  }
}

Files.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
};
