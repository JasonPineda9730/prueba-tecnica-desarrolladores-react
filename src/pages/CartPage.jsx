import { Container } from 'react-bootstrap';
import Checkout from '../components/Checkout/Checkout.jsx';

function CartPage() {
  return (
    <Container className="checkout-page py-5">
      <p className="eyebrow">TU SELECCIÓN</p>
      <h1 className="section-title mb-4">Carrito de compras</h1>
      <Checkout />
    </Container>
  );
}

export default CartPage;
