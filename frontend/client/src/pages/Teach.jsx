import { useEffect, useState } from 'react';
import axios from 'axios';

function Teach() {
  const [response, setResponse] = useState('');
  const topic = localStorage.getItem('selectedTopic');
  const subjectId = localStorage.getItem('selectedSubjectId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('/api/chat/teach', {
          subjectId,
          topic,
          style: "Explain with code and diagram"
        });
        setResponse(res.data.answer);
      } catch (err) {
        console.error('Error:', err);
        setResponse('⚠️ Failed to load teaching content.');
      }
    };

    if (subjectId && topic) fetchData();
  }, []);

  return (
    <div>
      <h2>{topic}</h2>
      <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
    </div>
  );
}

export default Teach;
