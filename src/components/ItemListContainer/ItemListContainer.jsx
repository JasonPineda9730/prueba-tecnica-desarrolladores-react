import { useEffect, useState } from 'react';
import { Alert, Col, Form, Row, Spinner } from 'react-bootstrap';
import { getProductCategories, getProducts, getProductsByCategory } from '../../services/productsApi.js';
import ItemList from '../ItemList/ItemList.jsx';

function ItemListContainer({ greeting, category, onCategoryChange }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const data = category ? await getProductsByCategory(category, { signal: controller.signal }) : await getProducts({ signal: controller.signal });
        setProducts(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();
    getProductCategories({ signal: controller.signal }).then(setCategories).catch((requestError) => {
      if (requestError.name !== 'AbortError') setCategoryError('No fue posible cargar las categorías.');
    });
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="catalog-title">
      <Row className="align-items-end justify-content-between g-3 mb-4">
        <Col>
          <p className="eyebrow">Descubre TechStore</p>
          <h2 id="catalog-title" className="section-title mb-1">{greeting || 'Nuestros productos'}</h2>
          <p className="text-secondary mb-0">Tecnología seleccionada para hacer más cada día.</p>
        </Col>
        <Col xs={12} sm="auto">
          <Form.Group controlId="product-category">
            <Form.Label className="visually-hidden">Filtrar por categoría</Form.Label>
            <Form.Select value={category || ''} onChange={(event) => onCategoryChange(event.target.value)}>
              <option value="">Todas las categorías</option>
              {categories.map((item) => <option value={item} key={item}>{item.replaceAll('-', ' ')}</option>)}
            </Form.Select>
          </Form.Group>
          {categoryError && <span className="small text-secondary" role="status">{categoryError}</span>}
        </Col>
      </Row>
      {loading ? (
        <div className="loading-state" role="status" aria-live="polite"><Spinner animation="border" variant="primary" aria-hidden="true" /><span>Cargando productos...</span></div>
      ) : error ? (
        <Alert variant="danger" className="empty-state">{error}</Alert>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
}

export default ItemListContainer;