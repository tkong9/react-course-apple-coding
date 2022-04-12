import logo from './logo.svg';
import './App.css';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
} from 'react-bootstrap';
import items from './data';
import { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';
import styled from 'styled-components';

const Loading = styled.h2`
  text-align: center;
`;

const Failed = styled.h2`
  text-align: center;
`;

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.id + 1}.jpg`}
        width="100%"
        alt="shoes"
      />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
    </div>
  );
}

function App() {
  let [shoes, setShoes] = useState(items);
  let [isLoading, setIsLoading] = useState(true);
  let [isFailed, setIsFailed] = useState(false);
  let [stockCount, setStockCount] = useState([7, 8, 9]);
  useEffect(() => {}, [shoes]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        {' '}
        <Route exact path="/">
          <div className="container">
            <div className="row">
              {shoes.map((shoe) => {
                return (
                  <Item
                    id={shoe.id}
                    title={shoe.title}
                    content={shoe.content}
                    key={shoe.id}
                  ></Item>
                );
              })}
            </div>
          </div>
          {isLoading ? <Loading>Loading...</Loading> : null}
          <button
            className="btn btn-primary"
            onClick={() => {
              axios
                .get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  console.log(result.data);
                  console.log(shoes);
                  setShoes([...shoes, ...result.data]);
                  setIsLoading(false);
                })
                .catch(() => {
                  console.log('요청실패시실행할코드');
                  setIsFailed(true);
                });
            }}
          >
            더보기
          </button>
          {isFailed ? <Failed>Request Failed!</Failed> : null}
        </Route>
        <Route path="/detail/:id">
          <Detail
            shoes={shoes}
            stockCount={stockCount}
            setStockCount={setStockCount}
          ></Detail>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
