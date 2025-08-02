// frontend/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // ✅ Fetch subjects with token
    axios
      .get('/api/subjects', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('Fetched subjects:', res.data);
        setSubjects(res.data);
      })
      .catch((err) => {
        console.error('AXIOS ERROR:', err.message);
        if (err.response?.status === 401) {
          // Token invalid/expired → logout
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleClick = (id) => {
    navigate(`/syllabus/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {/* 🔹 Top Bar with Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Select a Subject</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Logout
        </button>
      </div>

      {/* 🔹 Subjects List */}
      <div className="subject-list">
        {Array.isArray(subjects) && subjects.length > 0 ? (
          subjects.map((subject) => (
            <button
              key={subject._id}
              onClick={() => handleClick(subject._id)}
              style={{
                display: 'block',
                margin: '0.5rem 0',
                padding: '0.5rem',
                width: '200px',
                cursor: 'pointer',
              }}
            >
              {subject.name}
            </button>
          ))
        ) : (
          <p>No subjects found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
