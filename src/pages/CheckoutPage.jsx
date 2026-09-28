import { Container } from 'react-bootstrap';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm.jsx';

function CheckoutPage() {
  return (
    <Container className="checkout-page py-5">
      <p className="eyebrow">TU COMPRA, A UN PASO</p>
      <h1 className="section-title mb-4">Finalizar compra</h1>
      <CheckoutForm />
    </Container>
  );
}

export default CheckoutPage;
