import { useContext, useState } from 'react';
import { Alert, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCartShopping, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext.jsx';
import Brief from '../Brief/Brief.jsx';

function Checkout() {
  const { cartItems, totalQuantity, removeItem, clearCart, total } = useContext(CartContext);
  const [orderId, setOrderId] = useState('');
  const [imageErrors, setImageErrors] = useState({});

  function finishPurchase() {
    if (cartItems.length === 0) return;
    const simulatedOrder = `TS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(simulatedOrder);
    clearCart();
  }

  if (orderId) {
    return (
      <Card className="success-card border-0 text-center">
        <Card.Body className="p-5">
          <span className="success-check" aria-hidden="true"><FontAwesomeIcon icon={faCircleCheck} /></span>
          <h2 className="h3 mt-3">¡Compra realizada correctamente!</h2>
          <p className="text-secondary">Tu orden <strong>#{orderId}</strong> quedó registrada en esta demostración.</p>
          <Button as={Link} to="/" variant="primary" className="mt-2">Volver al catálogo</Button>
        </Card.Body>
      </Card>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Card className="empty-cart border-0 text-center">
        <Card.Body className="p-5">
          <span className="empty-cart-icon" aria-hidden="true"><FontAwesomeIcon icon={faCartShopping} /></span>
          <h2 className="h4 mt-3">Tu carrito está esperando algo increíble</h2>
          <p className="text-secondary">Explora el catálogo y agrega tus productos favoritos.</p>
          <Button as={Link} to="/" variant="primary" className="mt-2">Volver al catálogo</Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <Link to="/" className="back-link"><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Seguir comprando</Link>
      <Row className="g-4 mt-1">
        <Col lg={8}>
          <div className="d-flex align-items-end justify-content-between mb-3 gap-3">
            <div><p className="eyebrow mb-1">CASI ES TUYO</p><h2 className="section-title mb-0">Tu carrito <span className="text-secondary fs-6 fw-normal">({totalQuantity} artículos)</span></h2></div>
            <Button variant="link" className="clear-cart-button" onClick={() => { clearCart(); setOrderId(''); }}>Vaciar carrito</Button>
          </div>
          <ListGroup className="checkout-items">
            {cartItems.map((item) => {
              const image = item.thumbnail || item.images?.[0];
              return (
                <ListGroup.Item key={item.id} className="checkout-item">
                  {image && !imageErrors[item.id] ? <Image src={image} alt={item.title || 'Producto'} className="checkout-item__image" onError={() => setImageErrors((current) => ({ ...current, [item.id]: true }))} /> : <div className="checkout-item__image checkout-item__fallback" role="img" aria-label="Imagen no disponible">—</div>}
                  <div className="checkout-item__info">
                    <span className="product-category">{item.category || 'Tecnología'}</span>
                    <h3 className="checkout-item__title">{item.title}</h3>
                    <span className="text-secondary small">${Number(item.price).toFixed(2)} por unidad · Cantidad: {item.quantity}</span>
                    <span className="d-lg-none fw-semibold mt-1">Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                  <strong className="checkout-item__subtotal d-none d-lg-block">${(Number(item.price) * item.quantity).toFixed(2)}</strong>
                  <Button variant="outline-danger" className="remove-item-button" aria-label={`Eliminar ${item.title} del carrito`} onClick={() => removeItem(item.id)}>
                    <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <Brief />
          <Button variant="primary" size="lg" className="w-100 mt-3 checkout-button" onClick={finishPurchase} disabled={!cartItems.length || !Number.isFinite(total)}>
            Finalizar compra · ${total.toFixed(2)}
          </Button>
          <Alert variant="light" className="mt-3 small text-secondary">Compra simulada: no se procesarán pagos reales.</Alert>
        </Col>
      </Row>
    </div>
  );
}

export default Checkout;