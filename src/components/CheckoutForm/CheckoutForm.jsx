import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext.jsx';
import { validateCheckoutFields } from '../../utils/checkoutValidation.js';
import Brief from '../Brief/Brief.jsx';

const INITIAL_FIELDS = { name: '', email: '', address: '' };

function CheckoutForm() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (!processing) return undefined;

    // La demora representa una confirmación de demostración; no se procesa ni guarda información de pago.
    const timeoutId = window.setTimeout(() => {
      if (cartItems.length === 0) {
        setProcessing(false);
        return;
      }
      setOrderId(`TS-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
      setProcessing(false);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [processing, cartItems.length, clearCart]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((currentFields) => ({ ...currentFields, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (processing || cartItems.length === 0) return;

    const nextErrors = validateCheckoutFields(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setProcessing(true);
  }

  if (orderId) {
    return (
      <Card className="success-card border-0 text-center">
        <Card.Body className="p-5">
          <span className="success-check" aria-hidden="true"><FontAwesomeIcon icon={faCircleCheck} /></span>
          <h2 className="h3 mt-3">¡Compra realizada correctamente!</h2>
          <p className="text-secondary">Tu pedido <strong>#{orderId}</strong> quedó confirmado en esta demostración. No se realizó ningún pago.</p>
          <Button as={Link} to="/" variant="primary" className="mt-2">Volver al catálogo</Button>
        </Card.Body>
      </Card>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Card className="empty-cart border-0 text-center">
        <Card.Body className="p-5">
          <h2 className="h4">No hay productos para finalizar la compra</h2>
          <p className="text-secondary">Agrega productos tecnológicos desde el catálogo para continuar.</p>
          <Button as={Link} to="/" variant="primary" className="mt-2">Volver al catálogo</Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row className="g-4">
      <Col lg={7}>
        <Card className="checkout-form-card border-0">
          <Card.Body className="p-4 p-md-5">
            <h2 className="h4 mb-2">Datos de contacto y envío</h2>
            <p className="text-secondary mb-4">Completa los datos requeridos para confirmar tu pedido de demostración.</p>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="checkout-name">Nombre completo</Form.Label>
                <Form.Control id="checkout-name" name="name" autoComplete="name" value={fields.name} onChange={handleChange} isInvalid={Boolean(errors.name)} aria-describedby={errors.name ? 'checkout-name-error' : undefined} />
                <Form.Control.Feedback id="checkout-name-error" type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="checkout-email">Correo electrónico</Form.Label>
                <Form.Control id="checkout-email" type="email" name="email" autoComplete="email" value={fields.email} onChange={handleChange} isInvalid={Boolean(errors.email)} aria-describedby={errors.email ? 'checkout-email-error' : undefined} />
                <Form.Control.Feedback id="checkout-email-error" type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label htmlFor="checkout-address">Dirección de envío</Form.Label>
                <Form.Control id="checkout-address" as="textarea" rows={3} name="address" autoComplete="street-address" value={fields.address} onChange={handleChange} isInvalid={Boolean(errors.address)} aria-describedby={errors.address ? 'checkout-address-error' : undefined} />
                <Form.Control.Feedback id="checkout-address-error" type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
              <Alert variant="info" className="small">Esta compra es simulada. No se solicitan datos bancarios ni se realiza ningún cobro.</Alert>
              <Button type="submit" variant="primary" size="lg" className="w-100 checkout-button" disabled={processing || cartItems.length === 0}>
                {processing ? 'Confirmando pedido…' : 'Confirmar pedido simulado'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={5}>
        <Brief />
        <Link to="/cart" className="back-link mt-3"><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Volver al carrito</Link>
      </Col>
    </Row>
  );
}

export default CheckoutForm;
