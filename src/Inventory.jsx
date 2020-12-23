import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

export default class Inventory extends Component {
  handleItemAdd(event) {
    event.preventDefault();
    let item = this.props.state.inventory[this.props.state.inventorySelected];
    this.props.itemManager.addItem(item);
    this.props.updateItems();
  }

  selectInventoryItem(name) {
    this.props.state.inventorySelected = name;
  }

  render() {
    var inventoryComponents = [];
    var count = 0;
    var itemNames = Object.keys(this.props.state.inventory);
    for (let i = 0; i < itemNames.length; i++) {
      // TODO there is some selection weirdness here, need to fix
      inventoryComponents.push(<ListGroup.Item
        action
        /*active={this.props.state.inventorySelected === itemNames[i]}*/
        key={count}
        href={"#" + count}
        onClick={() => {
          this.selectInventoryItem(itemNames[i]);
        }}
      >
        {itemNames[i]}
      </ListGroup.Item>
      );
     count += 1;
    }
    return (
      <Card className="inventory">
        <Card.Header as="h5">Inventory</Card.Header>

        <Card.Body>
          <ListGroup variant="flush">{inventoryComponents}</ListGroup>
        </Card.Body>

        <Card.Body>
          <Form onSubmit={e => this.handleItemAdd(e)}>
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

Inventory.propTypes = {
  state: PropTypes.object.isRequired,
  updateItems: PropTypes.func.isRequired,
  itemManager: PropTypes.object.isRequired
};
