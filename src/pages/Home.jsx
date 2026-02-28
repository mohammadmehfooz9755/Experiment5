import { Container, Row, Col } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import CardComponent from '../components/CardComponent';
import { useAppContext } from '../context/AppContext';

const FEATURED_PRODUCTS = [
  { id: 1,  name: 'AirPods Pro Max',     price: 24999, originalPrice: 29999, image: '🎧', rating: 5, reviews: 214, badge: 'Sale', category: 'Audio' },
  { id: 2,  name: 'Mechanical Keyboard', price: 7499,  originalPrice: 9999,  image: '⌨️', rating: 4, reviews: 98,  badge: 'New',  category: 'Peripherals' },
  { id: 3,  name: 'Smart Watch Pro',     price: 14999, originalPrice: 17999, image: '⌚', rating: 5, reviews: 312, badge: 'Sale', category: 'Wearables' },
  { id: 4,  name: 'USB-C Hub 7-in-1',   price: 2499,  originalPrice: null,  image: '🔌', rating: 4, reviews: 56,  badge: null,   category: 'Accessories' },
];

const Home = () => {
  const { theme } = useAppContext();

  return (
    <div style={{ background: theme === 'dark' ? '#0f172a' : '#ffffff', minHeight: '100vh', transition: 'all 0.3s' }}>
      <HeroSection />

      {/* Categories strip */}
      <div style={{ background: theme === 'dark' ? '#1e293b' : '#f8fafc', borderTop: '1px solid', borderBottom: '1px solid', borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', padding: '1.25rem 0' }}>
        <Container>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            {['📱 Smartphones','💻 Laptops','🎧 Audio','⌚ Wearables','🖥️ Monitors','🖱️ Peripherals'].map(cat => (
              <span
                key={cat}
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: theme === 'dark' ? '#94a3b8' : '#475569', padding: '6px 16px', borderRadius: '100px', background: theme === 'dark' ? '#0f172a' : '#fff', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.color = '#f97316'; e.target.style.borderColor = '#f97316'; }}
                onMouseLeave={e => { e.target.style.color = theme === 'dark' ? '#94a3b8' : '#475569'; e.target.style.borderColor = theme === 'dark' ? '#334155' : '#e2e8f0'; }}
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Featured Products */}
      <Container style={{ padding: '4rem 1rem' }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', color: '#f97316', textTransform: 'uppercase', marginBottom: '4px' }}>Handpicked</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: theme === 'dark' ? '#f1f5f9' : '#0f172a', margin: 0 }}>Featured Products</h2>
          </div>
        </div>
        <Row className="g-4">
          {FEATURED_PRODUCTS.map(product => (
            <Col key={product.id} xs={12} sm={6} lg={3}>
              <CardComponent product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trust badges */}
      <div style={{ background: theme === 'dark' ? '#1e293b' : '#fff7ed', padding: '3rem 0' }}>
        <Container>
          <Row className="text-center g-4">
            {[
              ['🚚','Free Shipping','On orders above ₹999'],
              ['🔄','Easy Returns','30-day hassle-free returns'],
              ['🔒','Secure Payment','100% safe & encrypted'],
              ['🎧','24/7 Support',"We're always here to help"],
            ].map(([icon, title, desc]) => (
              <Col key={title} xs={6} md={3}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
                <h6 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: theme === 'dark' ? '#f1f5f9' : '#0f172a', marginBottom: '4px' }}>{title}</h6>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: theme === 'dark' ? '#64748b' : '#94a3b8', margin: 0 }}>{desc}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;