import { useState } from 'react';
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import ItemQuantitySelector from '../ItemQuantitySelector/ItemQuantitySelector.jsx';
import AddItemButton from '../AddItemButton/AddItemButton.jsx';

function ItemDetail({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const image = product.images?.[0] || product.thumbnail;
  return (
    <Container className="detail-section py-5">
      <Link to="/" className="back-link"><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /> Volver al catálogo</Link>
      <Row className="g-5 align-items-center mt-2">
        <Col lg={6}>
          <div className="detail-image-wrap">
            {image && !imageFailed ? <Image src={image} alt={product.title || 'Producto de TechStore'} fluid className="detail-image" onError={() => setImageFailed(true)} /> : <div className="product-card__image-fallback" role="img" aria-label="Imagen no disponible">Imagen no disponible</div>}
          </div>
        </Col>
        <Col lg={6}>
          <Badge bg="light" text="dark" className="product-category detail-category">{product.category || 'Tecnología'}</Badge>
          <h1 className="detail-title mt-3">{product.title || 'Producto sin nombre'}</h1>
          {Number.isFinite(Number(product.rating)) && <p className="rating-line"><FontAwesomeIcon icon={faStar} aria-hidden="true" /> {Number(product.rating).toFixed(1)} <span className="text-secondary">de 5</span></p>}
          <p className="detail-description">{product.description || 'Descubre este producto de TechStore.'}</p>
          <p className="detail-price">${Number(product.price || 0).toFixed(2)}</p>
          {Number.isFinite(Number(product.stock)) && <p className="stock-line">{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}</p>}
          <div className="detail-purchase-controls">
            <ItemQuantitySelector stock={product.stock} onQuantityChange={setQuantity} />
            <AddItemButton product={product} quantity={quantity} />
          </div>
          <Button as={Link} to="/" variant="outline-primary" className="mt-3">Seguir explorando</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetail;