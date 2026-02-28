import { useState, useMemo } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import CardComponent from '../components/CardComponent';
import FilterBar from '../components/FilterBar';
import { useAppContext } from '../context/AppContext';

const ALL_PRODUCTS = [
  { id: 1,  name: 'AirPods Pro Max',       price: 24999, originalPrice: 29999, image: '🎧', rating: 5, reviews: 214, badge: 'Sale', category: 'Audio' },
  { id: 2,  name: 'Mechanical Keyboard',   price: 7499,  originalPrice: 9999,  image: '⌨️', rating: 4, reviews: 98,  badge: 'New',  category: 'Peripherals' },
  { id: 3,  name: 'Smart Watch Pro',       price: 14999, originalPrice: 17999, image: '⌚', rating: 5, reviews: 312, badge: 'Sale', category: 'Wearables' },
  { id: 4,  name: 'USB-C Hub 7-in-1',     price: 2499,  originalPrice: null,  image: '🔌', rating: 4, reviews: 56,  badge: null,   category: 'Accessories' },
  { id: 5,  name: 'Gaming Mouse',          price: 3999,  originalPrice: 4999,  image: '🖱️', rating: 4, reviews: 143, badge: 'Sale', category: 'Peripherals' },
  { id: 6,  name: 'LED Monitor 27"',       price: 22999, originalPrice: 27999, image: '🖥️', rating: 5, reviews: 89,  badge: null,   category: 'Monitors' },
  { id: 7,  name: 'Laptop Stand',          price: 1799,  originalPrice: null,  image: '💻', rating: 4, reviews: 201, badge: 'New',  category: 'Accessories' },
  { id: 8,  name: 'Noise Cancelling Buds', price: 8999,  originalPrice: 10999, image: '🎵', rating: 5, reviews: 178, badge: 'Hot',  category: 'Audio' },
  { id: 9,  name: 'Webcam 4K',             price: 5499,  originalPrice: 6999,  image: '📷', rating: 4, reviews: 67,  badge: null,   category: 'Peripherals' },
  { id: 10, name: 'Fitness Band',          price: 4499,  originalPrice: null,  image: '💪', rating: 4, reviews: 230, badge: 'New',  category: 'Wearables' },
  { id: 11, name: 'Desk Lamp LED',         price: 1299,  originalPrice: 1799,  image: '💡', rating: 3, reviews: 44,  badge: 'Sale', category: 'Accessories' },
  { id: 12, name: 'Portable SSD 1TB',      price: 6999,  originalPrice: null,  image: '💾', rating: 5, reviews: 155, badge: null,   category: 'Storage' },
];

const CATEGORIES = [...new Set(ALL_PRODUCTS.map(p => p.category))];

const Products = () => {
  const { theme } = useAppContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // useMemo: only recomputes when search or category changes
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div style={{ background: theme === 'dark' ? '#0f172a' : '#ffffff', minHeight: '100vh', transition: 'all 0.3s' }}>
      <div style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #fff7ed, #ffedd5)', padding: '3rem 0 2rem' }}>
        <Container>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', color: '#f97316', textTransform: 'uppercase', marginBottom: '4px' }}>Browse</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: theme === 'dark' ? '#f1f5f9' : '#0f172a', marginBottom: '0.5rem' }}>All Products</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#94a3b8', marginBottom: 0 }}>Explore our full range of tech products</p>
        </Container>
      </div>

      <Container style={{ padding: '2rem 1rem 4rem' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <FilterBar search={search} setSearch={setSearch} category={category} setCategory={setCategory} categories={CATEGORIES} />
          <Badge style={{ background: theme === 'dark' ? '#1e293b' : '#f1f5f9', color: theme === 'dark' ? '#94a3b8' : '#64748b', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.85rem', padding: '8px 14px', borderRadius: '8px', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}>
            {filteredProducts.length} of {ALL_PRODUCTS.length} products
          </Badge>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h5 style={{ fontFamily: "'Syne', sans-serif", color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}>No products found</h5>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#94a3b8' }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} lg={3}>
                <CardComponent product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;