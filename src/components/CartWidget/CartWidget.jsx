import { useContext } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext.jsx';

function CartWidget() {
  const { totalQuantity } = useContext(CartContext);
  return (
    <Button as={Link} to="/checkout" variant="light" className="cart-widget" aria-label={`Carrito, ${totalQuantity} productos`}>
      <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
      <span>Carrito</span>
      <Badge bg="primary" pill>{totalQuantity}</Badge>
    </Button>
  );
}

export default CartWidget;