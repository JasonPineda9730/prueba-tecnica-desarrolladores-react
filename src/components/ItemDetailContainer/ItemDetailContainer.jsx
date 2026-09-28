import { useEffect, useState } from 'react';
import { Alert, Button, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productsApi.js';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setLoading(true);
    setError('');
    getProductById(id, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setProduct(data);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id, retryCount]);

  if (loading) return <div className="loading-state detail-loading" role="status"><Spinner animation="border" variant="primary" aria-hidden="true" /><span>Cargando producto...</span></div>;
  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="empty-state">
          <p>{error || 'No encontramos el producto solicitado.'}</p>
          {error && <Button variant="outline-primary" onClick={() => setRetryCount((attempt) => attempt + 1)}>Reintentar</Button>}
        </Alert>
      </Container>
    );
  }
  return <ItemDetail product={product} />;
}

export default ItemDetailContainer;