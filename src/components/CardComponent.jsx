import { Card, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { useAppContext } from '../context/AppContext';
import { BsCartPlus, BsStar, BsStarFill } from 'react-icons/bs';

const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const { theme } = useAppContext();
  const { id, name, price, originalPrice, image, rating, reviews, badge } = product;

  return (
    <Card
      style={{
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        borderRadius: '16px', overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer', height: '100%',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(249,115,22,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ background: theme === 'dark' ? '#0f172a' : '#f8fafc', padding: '1.5rem', textAlign: 'center', position: 'relative' }}>
        {badge && (
          <Badge style={{ position: 'absolute', top: '12px', left: '12px', background: badge === 'Sale' ? '#ef4444' : badge === 'New' ? '#22c55e' : '#f97316', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.7rem', padding: '4px 10px', borderRadius: '100px' }}>
            {badge}
          </Badge>
        )}
        <span style={{ fontSize: '4rem' }}>{image}</span>
      </div>

      <Card.Body style={{ padding: '1.25rem' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#f97316', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
          TechMart
        </p>
        <Card.Title style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: theme === 'dark' ? '#f1f5f9' : '#0f172a', marginBottom: '0.5rem' }}>
          {name}
        </Card.Title>

        <div className="d-flex align-items-center gap-1 mb-3">
          {[1,2,3,4,5].map(s =>
            s <= Math.round(rating)
              ? <BsStarFill key={s} style={{ color: '#f59e0b', fontSize: '0.75rem' }} />
              : <BsStar key={s} style={{ color: '#cbd5e1', fontSize: '0.75rem' }} />
          )}
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: theme === 'dark' ? '#64748b' : '#94a3b8', marginLeft: '4px' }}>({reviews})</span>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#f97316' }}>₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
          <Button
            onClick={() => dispatch(addItem({ id, name, price, image }))}
            style={{ background: '#f97316', border: 'none', borderRadius: '8px', padding: '8px 14px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <BsCartPlus /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;