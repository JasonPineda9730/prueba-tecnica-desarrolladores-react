import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { getProductCategories, getProductsByCategory, getTechnologyProducts } from '../../services/productsApi.js';
import { getCategoryLabel } from '../../utils/productLabels.js';
import ItemList from '../ItemList/ItemList.jsx';

function ItemListContainer({ greeting, category, onCategoryChange }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [error, setError] = useState('');
  const [retryProducts, setRetryProducts] = useState(0);
  const [retryCategories, setRetryCategories] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const data = category
          ? await getProductsByCategory(category, { signal: controller.signal })
          : await getTechnologyProducts({ signal: controller.signal });
        if (!controller.signal.aborted) setProducts(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [category, retryProducts]);

  useEffect(() => {
    const controller = new AbortController();
    setCategoryError('');
    getProductCategories({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setCategories(data);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setCategoryError('No fue posible cargar las categorías.');
      });
    return () => controller.abort();
  }, [retryCategories]);

  return (
    <section aria-labelledby="catalog-title">
      <Row className="align-items-end justify-content-between g-3 mb-4">
        <Col>
          <p className="eyebrow">Descubre TechStore</p>
          <h2 id="catalog-title" className="section-title mb-1">{greeting || 'Nuestros productos'}</h2>
          <p className="text-secondary mb-0">Tecnología seleccionada para hacer más cada día.</p>
        </Col>
        <Col xs={12} sm="auto">
          <Form.Group>
            <Form.Label htmlFor="product-category">Filtrar por categoría tecnológica</Form.Label>
            <Form.Select id="product-category" value={category || ''} onChange={(event) => onCategoryChange(event.target.value)}>
              <option value="">Toda la tecnología</option>
              {categories.map((item) => <option value={item} key={item}>{getCategoryLabel(item)}</option>)}
            </Form.Select>
          </Form.Group>
          {categoryError && (
            <div className="small text-danger mt-2" role="status">
              {categoryError}{' '}
              <Button variant="link" className="p-0 align-baseline" onClick={() => setRetryCategories((attempt) => attempt + 1)}>
                Reintentar
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {loading ? (
        <div className="loading-state" role="status" aria-live="polite"><Spinner animation="border" variant="primary" aria-hidden="true" /><span>Cargando productos...</span></div>
      ) : error ? (
        <Alert variant="danger" className="empty-state">
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => setRetryProducts((attempt) => attempt + 1)}>
            Reintentar
          </Button>
        </Alert>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
}

export default ItemListContainer;