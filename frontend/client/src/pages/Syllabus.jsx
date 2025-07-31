import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Syllabus() {
  const { subjectId } = useParams();
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    axios.get(`/api/subjects/${subjectId}/syllabus`)
      .then(res => setSyllabus(res.data))
      .catch(err => console.error('Failed to fetch syllabus:', err));
  }, [subjectId]);

  return (
    <div>
      <h2>Syllabus for Subject</h2>
      {syllabus.length === 0 ? (
        <p>No syllabus sections found.</p>
      ) : (
        <ul>
          {syllabus.map(section => (
            <li key={section._id}>
              <h3>{section.sectionTitle}</h3>
              <p>{section.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Syllabus;
