import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer.jsx';

function Home() {
  const [category, setCategory] = useState('');
  return (
    <>
      <section className="hero-section">
        <Container className="hero-section__inner">
          <div className="hero-copy">
            <span className="hero-kicker">TECNOLOGÍA, A TU MANERA</span>
            <h1>Ideas nuevas.<br />Herramientas mejores.</h1>
            <p>Encuentra tus próximos favoritos entre tecnología diseñada para acompañarte.</p>
            <a className="btn btn-primary btn-lg" href="#catalogo">Explorar catálogo</a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
            <div className="hero-device hero-device--back" /><div className="hero-device hero-device--front"><span>TS</span></div>
            <div className="hero-spark hero-spark--one">✦</div><div className="hero-spark hero-spark--two">✧</div>
          </div>
        </Container>
      </section>
      <Container id="catalogo" className="catalog-section py-5">
        <ItemListContainer greeting="Encuentra algo increíble" category={category} onCategoryChange={setCategory} />
      </Container>
    </>
  );
}

export default Home;