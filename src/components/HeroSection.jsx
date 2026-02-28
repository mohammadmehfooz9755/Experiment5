import { Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const HeroSection = () => {
  const { theme } = useAppContext();

  return (
    <section
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
        padding: '6rem 0 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(249,115,22,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(249,115,22,0.08)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Badge
          style={{
            background: '#f97316', color: '#fff',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: '0.75rem', letterSpacing: '1.5px',
            padding: '6px 14px', borderRadius: '100px',
            marginBottom: '1.5rem', display: 'inline-block',
          }}
        >
          🔥 SUMMER SALE — UP TO 40% OFF
        </Badge>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
            lineHeight: 1.1, marginBottom: '1.5rem',
          }}
        >
          Next-Gen Tech,<br />
          <span style={{ color: '#f97316' }}>Delivered Fast.</span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '1.15rem',
            color: theme === 'dark' ? '#94a3b8' : '#475569',
            maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem',
          }}
        >
          Discover premium gadgets, accessories, and tech essentials — all in one place.
          Fast shipping, easy returns, and unbeatable prices.
        </p>

        <div className="d-flex gap-3 flex-wrap">
          <Button
            as={Link} to="/products"
            style={{ background: '#f97316', border: 'none', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, padding: '12px 32px', borderRadius: '8px', fontSize: '1rem' }}
          >
            Shop Now →
          </Button>
          <Button
            as={Link} to="/pricing" variant="outline-secondary"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: '12px 32px', borderRadius: '8px', fontSize: '1rem', color: theme === 'dark' ? '#e2e8f0' : '#1e293b', borderColor: theme === 'dark' ? '#334155' : '#cbd5e1' }}
          >
            View Plans
          </Button>
        </div>

        <div className="d-flex gap-4 mt-4 flex-wrap">
          {[['10K+', 'Products'], ['4.9★', 'Rating'], ['Free', 'Shipping >₹999']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#f97316' }}>{val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: theme === 'dark' ? '#64748b' : '#94a3b8', fontWeight: 600, letterSpacing: '0.5px' }}>{label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;