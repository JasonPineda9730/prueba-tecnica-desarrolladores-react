import { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productsApi.js';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setLoading(true);
    setError('');
    getProductById(id, { signal: controller.signal })
      .then(setProduct)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="loading-state detail-loading" role="status"><Spinner animation="border" variant="primary" aria-hidden="true" /><span>Cargando producto...</span></div>;
  if (error || !product) return <Container className="py-5"><Alert variant="warning" className="empty-state">{error || 'No encontramos el producto solicitado.'}</Alert></Container>;
  return <ItemDetail product={product} />;
}

export default ItemDetailContainer;