import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
      <Link to="/teach" style={{ margin: '0 10px' }}>Teach</Link>
      <Link to="/syllabus" style={{ margin: '0 10px' }}>Syllabus</Link>
    </nav>
  );
}

export default Navbar;
