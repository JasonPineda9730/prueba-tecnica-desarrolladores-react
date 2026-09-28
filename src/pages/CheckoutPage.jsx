import { Container } from 'react-bootstrap';
import Checkout from '../components/Checkout/Checkout.jsx';

function CheckoutPage() {
  return (
    <Container className="checkout-page py-5">
      <p className="eyebrow">TU COMPRA, A UN PASO</p>
      <h1 className="section-title mb-4">Checkout</h1>
      <Checkout />
    </Container>
  );
}

export default CheckoutPage;