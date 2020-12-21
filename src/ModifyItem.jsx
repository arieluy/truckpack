import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import PropTypes from "prop-types";

export default class ModifyItem extends Component {
  handleItemRemove(event) {
    event.preventDefault();
    this.props.itemManager.removeItem(this.props.state.selectedIndex);
    this.props.updateItems();
  }

  handleItemRotate(event) {
    event.preventDefault();
    this.props.itemManager.rotateItem(this.props.state.selectedIndex);
    this.props.updateItems();
  }

  handleStack(event) {
    event.preventDefault();
    let itemManager = this.props.itemManager;
    var selInd = this.props.state.selectedIndex;
    const item1 = itemManager.itemList[selInd];
    // finds the first intersecting square with the selected square and stacks
    // TODO what if multiple squares are stacked 
    // maybe multi-select would be good to implement? 
    for (let i = 0; i < itemManager.itemList.length; i++) {
      if (i !== selInd) {
        const r1 = item1;
        const r2 = itemManager.itemList[i];
        console.log(r1);
        console.log(r2);
        if (itemManager._intersect(r1, r2)) {
          var index2 = i;
          break;
        }
      }
    }
    if (index2 !== undefined) {
      console.log("stacking!");
      if (itemManager.stackable(selInd, index2)) {
        itemManager.stackItems(selInd, index2);
      } else {
        alert("These two items exceed the height of the truck!");
      }
      this.props.updateItems();
    }
  }

  handleUnstack(event) {
    event.preventDefault();
    this.props.itemManager.unstackItems(this.props.state.selectedIndex);
    this.props.updateItems();
  }

  render() {
    return (
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
    );
  }
}

ModifyItem.propTypes = {
  state: PropTypes.object.isRequired,
  updateItems: PropTypes.func.isRequired,
  itemManager: PropTypes.object.isRequired
};
