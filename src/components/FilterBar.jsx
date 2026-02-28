import { Form, InputGroup, Button } from 'react-bootstrap';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import { useAppContext } from '../context/AppContext';

const FilterBar = ({ search, setSearch, category, setCategory, categories }) => {
  const { theme } = useAppContext();

  const inputStyle = {
    background: theme === 'dark' ? '#1e293b' : '#f8fafc',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    fontFamily: "'DM Sans', sans-serif",
    borderRadius: '8px',
  };

  return (
    <div className="d-flex gap-3 flex-wrap align-items-center">
      <InputGroup style={{ maxWidth: '320px' }}>
        <InputGroup.Text style={{ ...inputStyle, borderRight: 'none' }}>
          <BsSearch style={{ color: '#f97316' }} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, borderLeft: 'none' }}
        />
        {search && (
          <Button variant="link" onClick={() => setSearch('')} style={{ color: '#94a3b8', padding: '0 8px' }}>
            <BsXCircleFill />
          </Button>
        )}
      </InputGroup>

      <Form.Select
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ ...inputStyle, maxWidth: '180px', cursor: 'pointer' }}
      >
        <option value="All">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </Form.Select>
    </div>
  );
};

export default FilterBar;