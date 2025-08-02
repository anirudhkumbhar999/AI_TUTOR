import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
    </nav>
  );
}

export default Navbar;
