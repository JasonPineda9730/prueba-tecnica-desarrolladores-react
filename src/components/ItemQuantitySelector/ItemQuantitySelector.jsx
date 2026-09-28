import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function ItemQuantitySelector({ stock, onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);
  const maximum = stock == null || stock === ''
    ? Infinity
    : Number.isFinite(Number(stock))
      ? Math.max(0, Number(stock))
      : Infinity;

  function updateQuantity(nextQuantity) {
    const next = Math.min(maximum, Math.max(1, nextQuantity));
    setQuantity(next);
    onQuantityChange(next);
  }

  return (
    <div>
      <span className="form-label d-block">Cantidad</span>
      <ButtonGroup aria-label="Seleccionar cantidad">
        <Button variant="outline-secondary" aria-label="Disminuir cantidad" disabled={quantity <= 1} onClick={() => updateQuantity(quantity - 1)}>
          <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
        </Button>
        <output className="quantity-value" aria-live="polite" aria-label={`Cantidad seleccionada: ${quantity}`}>{quantity}</output>
        <Button variant="outline-secondary" aria-label="Aumentar cantidad" disabled={quantity >= maximum} onClick={() => updateQuantity(quantity + 1)}>
          <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
        </Button>
      </ButtonGroup>
      {maximum === 0 && <span className="d-block text-danger small mt-2">Este producto está agotado.</span>}
    </div>
  );
}

export default ItemQuantitySelector;