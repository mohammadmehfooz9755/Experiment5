import { useMemo } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQty, clearCart } from '../redux/slices/cartSlice';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { theme, user } = useAppContext();
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  // useMemo: recomputes only when cart items change
  const { subtotal, discount, shipping, total } = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = subtotal > 20000 ? Math.round(subtotal * 0.05) : 0;
    const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99;
    const total = subtotal - discount + shipping;
    return { subtotal, discount, shipping, total };
  }, [items]);

  const cardStyle = { background: theme === 'dark' ? '#1e293b' : '#ffffff', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, borderRadius: '16px', padding: '1.5rem' };
  const textColor = theme === 'dark' ? '#f1f5f9' : '#0f172a';
  const mutedColor = theme === 'dark' ? '#64748b' : '#94a3b8';

  return (
    <div style={{ background: theme === 'dark' ? '#0f172a' : '#f8fafc', minHeight: '100vh', transition: 'all 0.3s' }}>
      <div style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #fff7ed, #ffedd5)', padding: '3rem 0 2rem' }}>
        <Container>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '2px', color: '#f97316', textTransform: 'uppercase', marginBottom: '4px' }}>Review Order</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: textColor, marginBottom: 0 }}>Your Cart</h1>
        </Container>
      </div>

      <Container style={{ padding: '2rem 1rem 4rem' }}>
        {items.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor }}>Your cart is empty</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: mutedColor }}>Add some products to get started!</p>
            <Button as={Link} to="/products" style={{ background: '#f97316', border: 'none', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: '10px 28px', borderRadius: '8px' }}>
              Browse Products
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <div style={cardStyle}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor, margin: 0 }}>
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </h5>
                  <Button variant="link" onClick={() => dispatch(clearCart())} style={{ color: '#ef4444', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textDecoration: 'none', padding: 0 }}>
                    Clear All
                  </Button>
                </div>

                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ width: '60px', height: '60px', background: theme === 'dark' ? '#0f172a' : '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                      {item.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor, margin: 0, fontSize: '0.95rem' }}>{item.name}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#f97316', fontWeight: 700, margin: 0, fontSize: '0.9rem' }}>₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Button size="sm" onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))} style={{ background: theme === 'dark' ? '#0f172a' : '#f1f5f9', border: 'none', color: textColor, width: '30px', height: '30px', padding: 0, borderRadius: '6px', fontWeight: 700 }}>−</Button>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                      <Button size="sm" onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))} style={{ background: '#f97316', border: 'none', color: '#fff', width: '30px', height: '30px', padding: 0, borderRadius: '6px', fontWeight: 700 }}>+</Button>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: textColor, margin: 0 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      <Button variant="link" onClick={() => dispatch(removeItem(item.id))} style={{ color: '#94a3b8', padding: 0, fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <div style={cardStyle}>
                <h5 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor, marginBottom: '1.25rem' }}>Order Summary</h5>
                {[
                  ['Subtotal', `₹${subtotal.toLocaleString()}`],
                  ['Discount', discount > 0 ? `−₹${discount.toLocaleString()}` : '—'],
                  ['Shipping', shipping === 0 ? 'FREE' : `₹${shipping}`],
                ].map(([label, val]) => (
                  <div key={label} className="d-flex justify-content-between mb-2">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: mutedColor, fontSize: '0.9rem' }}>{label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: label === 'Discount' && discount > 0 ? '#22c55e' : textColor, fontSize: '0.9rem' }}>{val}</span>
                  </div>
                ))}
                <hr style={{ borderColor: theme === 'dark' ? '#334155' : '#e2e8f0' }} />
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor }}>Total</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: '#f97316', fontSize: '1.25rem' }}>₹{total.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#22c55e', textAlign: 'center', marginBottom: '1rem' }}>
                    🎉 You saved ₹{discount.toLocaleString()} on this order!
                  </p>
                )}
                <Button style={{ width: '100%', background: '#f97316', border: 'none', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, padding: '12px', borderRadius: '8px', fontSize: '1rem' }}>
                  Checkout →
                </Button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: mutedColor, textAlign: 'center', marginTop: '0.75rem', marginBottom: 0 }}>
                  Ordering as {user.name}
                </p>
              </div>

              <div style={{ ...cardStyle, marginTop: '1rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: mutedColor, margin: 0 }}>
                  🔒 Secure checkout &nbsp;•&nbsp; 🚚 Free shipping above ₹999 &nbsp;•&nbsp; 🔄 30-day returns
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;