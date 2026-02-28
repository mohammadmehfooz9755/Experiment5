import { useMemo, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { useAppContext } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';

const PLANS = [
  {
    id: 101, name: 'Starter', monthlyPrice: 299, yearlyPrice: 2499, image: '🌱', color: '#22c55e',
    description: 'Perfect for individuals exploring premium tech.',
    features: ['Access to 500+ products','Standard 3-5 day shipping','Email support','Basic warranty (6 months)','2% cashback on orders'],
    missing: ['Priority shipping','Dedicated support','Extended warranty'],
  },
  {
    id: 102, name: 'Pro', monthlyPrice: 799, yearlyPrice: 6999, image: '⚡', color: '#f97316',
    description: 'For power users who want the best deals.',
    features: ['Access to all 10K+ products','Priority 1-2 day shipping','Priority chat & email support','Extended warranty (1 year)','5% cashback on orders','Early access to sales'],
    missing: ['Dedicated account manager'], popular: true,
  },
  {
    id: 103, name: 'Business', monthlyPrice: 1999, yearlyPrice: 17999, image: '🏢', color: '#8b5cf6',
    description: 'Tailored for teams and bulk purchasing.',
    features: ['Everything in Pro','Bulk order discounts (up to 20%)','Dedicated account manager','Custom invoicing & GST reports','Same-day dispatch','10% cashback on orders','White-glove delivery for large items'],
    missing: [],
  },
];

const Pricing = () => {
  const { theme, user } = useAppContext();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [billing, setBilling] = useState('monthly');

  // useMemo: computes price, savings, and cart status per plan based on billing toggle
  const planDetails = useMemo(() => {
    return PLANS.map(plan => {
      const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
      const savings = billing === 'yearly' ? plan.monthlyPrice * 12 - plan.yearlyPrice : 0;
      const inCart = cartItems.some(i => i.id === plan.id);
      return { ...plan, price, savings, inCart };
    });
  }, [billing, cartItems]);

  const textColor = theme === 'dark' ? '#f1f5f9' : '#0f172a';
  const mutedColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const cardBg    = theme === 'dark' ? '#1e293b' : '#ffffff';
  const cardBorder = theme === 'dark' ? '#334155' : '#e2e8f0';

  return (
    <div style={{ background: theme === 'dark' ? '#0f172a' : '#f8fafc', minHeight: '100vh', transition: 'all 0.3s' }}>
      {/* Header */}
      <div style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #fff7ed, #ffedd5)', padding: '4rem 0 3rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(249,115,22,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <Container style={{ position: 'relative' }}>
          <div className="d-flex justify-content-end mb-3">
            <ThemeToggle />
          </div>

          <Badge style={{ background: '#f97316', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.7rem', letterSpacing: '1.5px', padding: '5px 14px', borderRadius: '100px', marginBottom: '1rem', display: 'inline-block' }}>
            MEMBERSHIP PLANS
          </Badge>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: textColor, marginBottom: '1rem' }}>
            Simple, Transparent <span style={{ color: '#f97316' }}>Pricing</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: mutedColor, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Choose the plan that fits you. Hello, <strong style={{ color: textColor }}>{user.name}</strong>!
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', background: theme === 'dark' ? '#0f172a' : '#f1f5f9', borderRadius: '100px', padding: '4px', border: `1px solid ${cardBorder}` }}>
            {['monthly', 'yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{ background: billing === b ? '#f97316' : 'transparent', color: billing === b ? '#fff' : mutedColor, border: 'none', borderRadius: '100px', padding: '8px 24px', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                {b.charAt(0).toUpperCase() + b.slice(1)}
                {b === 'yearly' && <span style={{ background: billing === 'yearly' ? 'rgba(255,255,255,0.25)' : '#f97316', color: '#fff', fontSize: '0.65rem', padding: '1px 7px', borderRadius: '100px', marginLeft: '6px', fontWeight: 700 }}>SAVE</span>}
              </button>
            ))}
          </div>

          {billing === 'yearly' && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#22c55e', marginTop: '0.75rem' }}>
              🎉 Save up to ₹{Math.max(...PLANS.map(p => p.monthlyPrice * 12 - p.yearlyPrice)).toLocaleString()} per year!
            </p>
          )}
        </Container>
      </div>

      {/* Plans */}
      <Container style={{ padding: '3rem 1rem 4rem' }}>
        <Row className="g-4 justify-content-center">
          {planDetails.map(plan => (
            <Col key={plan.id} xs={12} md={6} lg={4}>
              <div
                style={{ background: cardBg, border: plan.popular ? `2px solid #f97316` : `1px solid ${cardBorder}`, borderRadius: '20px', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: plan.popular ? '0 20px 60px rgba(249,115,22,0.2)' : 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)'; } }}
                onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
              >
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#f97316', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '1px', padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="mb-3"><span style={{ fontSize: '2.5rem' }}>{plan.image}</span></div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: plan.color, marginBottom: '0.25rem' }}>{plan.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: mutedColor, marginBottom: '1.25rem' }}>{plan.description}</p>

                <div style={{ marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.5rem', color: textColor }}>₹{plan.price.toLocaleString()}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: mutedColor, marginLeft: '6px' }}>/{billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>

                {plan.savings > 0
                  ? <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#22c55e', marginBottom: '1.25rem', fontWeight: 600 }}>You save ₹{plan.savings.toLocaleString()} vs monthly</p>
                  : <div style={{ height: '1.75rem' }} />
                }

                <hr style={{ borderColor: cardBorder }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: textColor, marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }}>✓</span>{f}
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: mutedColor, marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px', opacity: 0.5 }}>
                      <span style={{ flexShrink: 0, marginTop: '2px' }}>✕</span>{f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => !plan.inCart && dispatch(addItem({ id: plan.id, name: `${plan.name} Plan (${billing})`, price: plan.price, image: plan.image }))}
                  style={{ background: plan.inCart ? (theme === 'dark' ? '#1e3a2e' : '#dcfce7') : plan.popular ? '#f97316' : 'transparent', border: plan.popular ? 'none' : `2px solid ${plan.inCart ? '#22c55e' : plan.color}`, color: plan.inCart ? '#22c55e' : plan.popular ? '#fff' : plan.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, padding: '12px', borderRadius: '10px', fontSize: '0.95rem', width: '100%', transition: 'all 0.2s', cursor: plan.inCart ? 'default' : 'pointer' }}
                >
                  {plan.inCart ? '✓ Added to Cart' : `Get ${plan.name}`}
                </Button>
              </div>
            </Col>
          ))}
        </Row>

        {/* FAQ */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '16px', padding: '2rem', marginTop: '3rem' }}>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: textColor, marginBottom: '1.5rem', textAlign: 'center' }}>Frequently Asked Questions</h4>
          <Row className="g-3">
            {[
              ['Can I switch plans anytime?', 'Yes! You can upgrade or downgrade at any time. Changes take effect immediately.'],
              ['Is there a free trial?', 'All plans come with a 7-day free trial — no credit card required.'],
              ['What payment methods are accepted?', 'UPI, debit/credit cards, net banking, and all major wallets.'],
              ['Can I cancel my subscription?', 'Absolutely. Cancel anytime with no hidden fees or penalties.'],
            ].map(([q, a]) => (
              <Col key={q} xs={12} md={6}>
                <div style={{ padding: '1rem', background: theme === 'dark' ? '#0f172a' : '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: textColor, fontSize: '0.9rem', marginBottom: '4px' }}>{q}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: mutedColor, margin: 0 }}>{a}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Pricing;