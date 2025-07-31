import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/subjects')
      .then(res => {
        console.log('Fetched subjects:', res.data);
        setSubjects(res.data);
      })
      .catch(err => {
        console.error('AXIOS ERROR:', err.message);
        console.log(err.response?.data); // helpful for debugging
      });
  }, []); // ✅ properly close useEffect here

  const handleClick = (id) => {
    navigate(`/syllabus/${id}`);
  };

  return (
    <div>
      <h2>Select a Subject</h2>
      <div className="subject-list">
        {Array.isArray(subjects) && subjects.map(subject => (
          <button key={subject._id} onClick={() => handleClick(subject._id)}>
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
