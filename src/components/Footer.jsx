import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { theme } = useAppContext();

  return (
    <footer
      style={{
        background: theme === 'dark' ? '#0f172a' : '#1e293b',
        color: '#94a3b8',
        padding: '3rem 0 1.5rem',
        marginTop: 'auto',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <h5 style={{ color: '#f97316', fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
              ⚡ TechMart
            </h5>
            <p style={{ fontSize: '0.9rem' }}>
              Your one-stop destination for cutting-edge tech gadgets and accessories.
            </p>
          </Col>
          <Col md={2} className="mb-3">
            <h6 style={{ color: '#e2e8f0', fontWeight: 700 }}>Pages</h6>
            {['/', '/products', '/cart', '/pricing'].map((to, i) => (
              <div key={to}>
                <Link to={to} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                  {['Home', 'Products', 'Cart', 'Pricing'][i]}
                </Link>
              </div>
            ))}
          </Col>
          <Col md={3} className="mb-3">
            <h6 style={{ color: '#e2e8f0', fontWeight: 700 }}>Support</h6>
            {['FAQ', 'Shipping Policy', 'Returns', 'Contact Us'].map(item => (
              <div key={item}>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer' }}>{item}</span>
              </div>
            ))}
          </Col>
          <Col md={3} className="mb-3">
            <h6 style={{ color: '#e2e8f0', fontWeight: 700 }}>Contact</h6>
            <p style={{ fontSize: '0.875rem', marginBottom: '4px' }}>📧 hello@techmart.com</p>
            <p style={{ fontSize: '0.875rem', marginBottom: '4px' }}>📞 +91 98765 43210</p>
            <p style={{ fontSize: '0.875rem' }}>📍 Ludhiana, Punjab, India</p>
          </Col>
        </Row>
        <hr style={{ borderColor: '#334155' }} />
        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginBottom: 0 }}>
          © 2026 TechMart. Built with React + Redux Toolkit + Bootstrap.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;