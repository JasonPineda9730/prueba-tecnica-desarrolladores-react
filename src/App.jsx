import { Container } from 'react-bootstrap';

function App() {
  return (
    <main className="app-shell">
      <Container className="py-5">
        <p className="text-uppercase fw-semibold text-primary mb-2">TechStore</p>
        <h1 className="h3">Tu próxima tecnología empieza aquí.</h1>
        <p className="text-secondary mb-0">
          Estamos preparando una experiencia de compra sencilla y confiable.
        </p>
      </Container>
    </main>
  );
}

export default App;