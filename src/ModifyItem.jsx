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
import ItStack from "./ItStack";
import Item from "./Item";

export default class ModifyItem extends Component {
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
