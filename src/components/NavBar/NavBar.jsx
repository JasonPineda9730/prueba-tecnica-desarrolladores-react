import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import CartWidget from '../CartWidget/CartWidget.jsx';

function NavBar() {
  return (
    <Navbar expand="lg" className="store-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-mark">
          <span className="brand-icon"><FontAwesomeIcon icon={faBolt} aria-hidden="true" /></span>
          Tech<span>Store</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="store-navigation" aria-label="Abrir menú" />
        <Navbar.Collapse id="store-navigation">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={Link} to="/" className="home-link">Catálogo</Nav.Link>
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;