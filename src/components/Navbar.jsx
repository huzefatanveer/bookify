import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from  'react-router-dom'

const MyNavBar =() => {
    return (
     <Navbar variant="primary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/books/orders">Orders</Nav.Link>

          </Nav>
        </Container> 
      </Navbar>
    )

}
export default MyNavBar;