import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppContext } from '../context/AppContext';
import { BsCartFill, BsMoonFill, BsSunFill } from 'react-icons/bs';

const AppNavbar = () => {
  const { theme, toggleTheme, user } = useAppContext();
  const cartItems = useSelector(state => state.cart.items);
  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <Navbar
      expand="lg"
      className="shadow-sm sticky-top"
      style={{
        background: theme === 'dark' ? '#0f172a' : '#ffffff',
        borderBottom: `2px solid ${theme === 'dark' ? '#f97316' : '#ea580c'}`,
        transition: 'all 0.3s ease',
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#f97316',
            letterSpacing: '-0.5px',
          }}
        >
          ⚡ TechMart
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center gap-1">
            {navLinks.map(link => (
              <Nav.Link
                key={link.to}
                as={Link}
                to={link.to}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  color:
                    location.pathname === link.to
                      ? '#f97316'
                      : theme === 'dark'
                      ? '#e2e8f0'
                      : '#1e293b',
                  borderBottom:
                    location.pathname === link.to ? '2px solid #f97316' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'all 0.2s',
                }}
              >
                {link.label === 'Cart' ? (
                  <span>
                    <BsCartFill className="me-1" />
                    Cart{' '}
                    {totalQty > 0 && (
                      <Badge bg="danger" pill>
                        {totalQty}
                      </Badge>
                    )}
                  </span>
                ) : (
                  link.label
                )}
              </Nav.Link>
            ))}

            <div style={{ width: '1px', height: '24px', background: '#cbd5e1', margin: '0 8px' }} />

            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              Hi, {user.name.split(' ')[0]}
            </span>

            <Button
              variant="link"
              onClick={toggleTheme}
              style={{ color: '#f97316', fontSize: '1.1rem', padding: '4px 8px' }}
              title="Toggle theme"
            >
              {theme === 'dark' ? <BsSunFill /> : <BsMoonFill />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;