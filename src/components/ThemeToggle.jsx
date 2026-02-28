import { Button } from 'react-bootstrap';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useAppContext } from '../context/AppContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <Button
      onClick={toggleTheme}
      style={{
        background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        color: '#f97316', borderRadius: '100px',
        padding: '6px 16px', fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, fontSize: '0.875rem',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.2s',
      }}
    >
      {theme === 'dark' ? <BsSunFill /> : <BsMoonFill />}
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default ThemeToggle;