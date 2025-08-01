import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Syllabus() {
  const { subjectId } = useParams();
  const [syllabusSections, setSyllabusSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/subjects/${subjectId}/syllabus`)
      .then(res => setSyllabusSections(res.data))
      .catch(err => {
        console.error('Failed to fetch syllabus:', err);
      });
  }, [subjectId]);

  const handleTeach = (sectionId) => {
    navigate(`/teach/${sectionId}`);
  };

  return (
    <div>
      <h2>📚 Syllabus for Subject</h2>

      {syllabusSections.length === 0 ? (
        <p>No syllabus sections found.</p>
      ) : (
        <ul>
          {syllabusSections.map((section) => (
            <li key={section._id} style={{ marginBottom: '10px' }}>
              <strong>{section.sectionTitle}</strong>
              <br />
              <small>{section.content.slice(0, 80)}...</small>
              <br />
              <button onClick={() => handleTeach(section._id)}>Start Learning</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Syllabus;
