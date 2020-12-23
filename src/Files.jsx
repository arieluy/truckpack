import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";


export default class Files extends Component {
  // Source: 
  // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
  handleFileSave(event) {
    event.preventDefault();
    const form = event.currentTarget;
    let filename = form.elements[0].value;
    // get JSON string obj from state, item manager
    var json_obj = "data:text/json;charset=utf-8," + encodeURIComponent(
                    JSON.stringify({itemManager: this.props.itemManager,
                                    state: this.props.state}));

    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", json_obj);
    if (filename === "") {
      filename = "truckpack"
    }
    if (!filename.endsWith(".json")) {
      filename = filename + ".json";
    }
    dlAnchorElem.setAttribute("download", filename);
    dlAnchorElem.click();
    alert("File saved successfully!");
  }

  // Source: 
  // https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
  handleFileLoad(event) {
    event.preventDefault();
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
      alert("File not found!");
      return false;
    }
    var fr = new FileReader();

    // the magic happens here
    const that = this;
    fr.onload = function(e) {
      console.log(e); 
      var result = JSON.parse(e.target.result);
      console.log(result); 
      try {
        that.props.loadFile(result.state, result.itemManager);
        alert("File loaded successfully!");
      } catch(err) {
        alert("File not formatted correctly!");
        console.log(err);
      }
    }
    fr.readAsText(files.item(0));
  }

  render() {
    return (
      <Card>
        <Card.Header as="h5">File Save/Load</Card.Header>
        <Card.Body>
          <Form onSubmit={e => this.handleFileSave(e)}>
            <Row>
              <Col>
                <Form.Group controlId="fileSave">
                  <Form.Label>File Name</Form.Label>
                  <Form.Control type="input" placeholder="truckpack.json"/>
                  <Button variant="primary" type="submit" block>
                    Generate File
                  </Button>
                  {/* this is a bit of a hack to enable the ability to download files directly. */}
                  <a id="downloadAnchorElem" style={{display:"none"}}></a> {/* eslint-disable-line */}
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Form onSubmit={e => this.handleFileLoad(e)}>
            <Row>
              <Col>                
                <input type="file" id="selectFiles" accept="application/json" />
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
  itemManager: PropTypes.object.isRequired,
  loadFile: PropTypes.func.isRequired
};
