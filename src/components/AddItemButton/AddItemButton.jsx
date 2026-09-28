import { useContext, useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext.jsx';

function AddItemButton({ product, quantity }) {
  const { addItem } = useContext(CartContext);
  const [feedback, setFeedback] = useState('');
  const [isError, setIsError] = useState(false);
  const stockLimit = product?.stock == null || product.stock === '' ? Infinity : Number(product.stock);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = window.setTimeout(() => setFeedback(''), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  function handleAdd() {
    const result = addItem(product, quantity);
    setIsError(!result.success);
    setFeedback(result.message);
  }

  return (
    <div className="add-item-action">
      <Button variant="primary" size="lg" onClick={handleAdd} disabled={!product || quantity < 1 || (Number.isFinite(stockLimit) && quantity > stockLimit)}>
        <FontAwesomeIcon icon={faCartPlus} className="me-2" aria-hidden="true" />Agregar al carrito
      </Button>
      {feedback && <Alert variant={isError ? 'danger' : 'success'} className="add-feedback mb-0" role="status">{feedback}</Alert>}
    </div>
  );
}

export default AddItemButton;