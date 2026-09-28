import { Alert, Col, Row } from 'react-bootstrap';
import Item from '../Item/Item.jsx';

function ItemList({ products }) {
  if (products.length === 0) return <Alert variant="light" className="empty-state">No encontramos productos en esta categoría.</Alert>;
  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
      {products.map((product) => <Col key={product.id}><Item product={product} /></Col>)}
    </Row>
  );
}

export default ItemList;