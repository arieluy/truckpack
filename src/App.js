import React, { Component } from 'react';
import './App.css';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Item from './Item';
import Truck from './Truck';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup'


class Truck_d extends React.Component {
  state = {
    color: '#0074d9'
  };
  render() {
    const {truck} = this.props;
    return (
      <Rect
        x={0}
        y={0}
        width={truck.width}
        height={truck.length}
        fill={this.state.color}
        onClick={this.handleClick}
      />
    );
  }
}

class Item_d extends React.Component {
  state = {
    isDragging: false 
  };
  render() {
    const {item} = this.props;
    console.log("items props", this.props);
    return (
      <>
      <Rect
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.length}
        fill={"#ff4136"}
        draggable
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={() => {
          this.setState({
            isDragging: false
          });
        }} 
      />
      <Text
        text={item.name}
        x={item.x}
        y={item.y}
      />
      </> 
    );
  }
}

class App extends Component {
  state = {
    truckHeight: 0,
    truckWidth: 0,
    truckLength: 0,
    items: []
  }; 

  updateItems=(i, newItem)=> {
    const newState = [...this.state.items];
    newState[i] = newItem;
    this.setState({items: newState})
  };

  render() {
    const items = [];
    const truck = new Truck(2*240,2*96,2*84,items);
    const item = new Item(100,100,100,10,10,10,"item",true);
    items.push(item);
    const itemComponents = items.map(it=> <Item_d item={it}/>);
    console.log("Hello", itemComponents)
    return (
      <div className="App">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Truck Packer</Navbar.Brand>
      </Navbar>
      <Container className ="space">
        <Row>
        <Col md={3}>
          <Card className="items">
          <Card.Header as="h5">Items</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action href="#link1">Alpha</ListGroup.Item>
              <ListGroup.Item action href="#link2">Beta</ListGroup.Item>
              <ListGroup.Item action href="#link3">2x 108s</ListGroup.Item>
            </ListGroup>
          </Card.Body>
          </Card>
          <Card className="additem">
            <Card.Header as="h5">Add Item</Card.Header>
            <Card.Body>
              <Form>
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
                    <Button variant="primary" type="submit" block>Add Item</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="truck">
        <Card>
          <Card.Header as="h5">Truck</Card.Header>
          <Card.Body>
            <Stage width={window.innerWidth/2} height={window.innerHeight/1.5}>
              <Layer>
                <Truck_d truck={truck}/>
                {itemComponents}
              </Layer>
            </Stage>
          </Card.Body>
        </Card>
        </Col>
        <Col md={3} className="dims">
        <Card>
          <Card.Header as="h5">Truck Dimensions</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form>
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
                    <Button variant="primary" type="submit" block>Enter</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        </Col> 
        </Row>
      </Container>
      </div>
    );
  }
}

export default App;
