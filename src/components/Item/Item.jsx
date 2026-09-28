import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getCategoryLabel } from '../../utils/productLabels.js';

function Item({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = product.thumbnail || product.images?.[0];

  return (
    <Card className="product-card h-100 border-0">
      <div className="product-card__image-wrap">
        {image && !imageFailed ? (
          <Card.Img variant="top" src={image} alt={product.title || 'Producto de TechStore'} className="product-card__image" onError={() => setImageFailed(true)} />
        ) : (
          <div className="product-card__image-fallback" role="img" aria-label="Imagen no disponible">Imagen no disponible</div>
        )}
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <span className="product-category mb-2">{getCategoryLabel(product.category)}</span>
        <Card.Title className="product-card__title">{product.title || 'Producto sin nombre'}</Card.Title>
        <div className="d-flex align-items-center justify-content-between gap-2 mt-auto pt-3">
          <span className="product-price">${Number(product.price || 0).toFixed(2)}</span>
          <Button as={Link} to={`/product/${product.id}`} variant="outline-primary" size="sm">
            Ver detalle <FontAwesomeIcon icon={faArrowRight} className="ms-1" aria-hidden="true" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;