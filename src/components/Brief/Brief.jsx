import { useContext } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx';

function Brief() {
  const { cartItems, total } = useContext(CartContext);
  return (
    <Card className="summary-card border-0">
      <Card.Body className="p-4">
        <h2 className="h5 mb-3">Resumen de compra</h2>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="summary-line px-0">
              <span><span className="d-block fw-semibold">{item.title}</span><span className="small text-secondary">{item.quantity} × ${Number(item.price).toFixed(2)}</span></span>
              <span className="fw-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <p className="small text-secondary mt-3 mb-0">Resumen de esta compra de demostración.</p>
      </Card.Body>
    </Card>
  );
}

export default Brief;