import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import logo from 'C:/Users/gaura/Desktop/Precog/election/src/app/img/logo.svg'
// import logo from '.'
export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
      
        <Navbar.Brand  src="logo.svg" >
         Dashboard For 18<sup>th</sup>LokShabha Elections, India</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
        
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link  >
            <img  width="40" height="40"
             src="https://www.iiit.ac.in/wp-content/uploads/2024/06/25th-year-celebration-1983x2048.png"
            /> &ensp; &ensp; International Institute of Information Technology, Hyderabad<br/> 
            &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;
           <img  width="40" height="40" src='http://localhost:3500/static/logo.png'/>
            &ensp; &ensp;          iHub-Data
             </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

