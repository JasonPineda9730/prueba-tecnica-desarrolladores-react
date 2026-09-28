import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

function NotFound() {
  return <Container className="py-5"><Alert variant="light" className="empty-state"><h1 className="h4">Esta página no está disponible</h1><p className="mb-0">Prueba volver al inicio para seguir explorando.</p></Alert></Container>;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <main className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<Container className="py-5"><h1 className="section-title">Tu carrito</h1><p className="text-secondary">El resumen de compra estará disponible enseguida.</p></Container>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;