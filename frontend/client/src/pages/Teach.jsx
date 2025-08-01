import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Teach() {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: Fetch section info
        const sectionRes = await axios.get(`/api/syllabus/section/${sectionId}`);
        setSection(sectionRes.data);

        // Step 2: Fetch AI teaching
        const aiRes = await axios.post('/api/chat/teach', { sectionId });
        setAiResponse(aiRes.data.response);

        setLoading(false);
      } catch (err) {
        console.error('❌ Teach page error:', err);
        setLoading(false);
      }
    }

    fetchData();
  }, [sectionId]);

  if (loading) return <p>Loading teaching material...</p>;

  return (
    <div className="teach-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {section ? (
        <>
          <h2>📘 {section.sectionTitle}</h2>
          <p>{section.content}</p>

          <div className="ai-teaching-box" style={{ marginTop: '2rem', padding: '1rem', background: '#f4f4f4', borderRadius: '8px' }}>
            <h3>🤖 AI Teaching:</h3>
            {aiResponse ? (
              <ReactMarkdown
                children={aiResponse}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            ) : (
              <p>Generating AI teaching...</p>
            )}
          </div>

          <div className="chat-box" style={{ marginTop: '2rem' }}>
            <h3>💬 Ask a Doubt</h3>
            {/* Future: Chatbox component here */}
          </div>
        </>
      ) : (
        <p>Section not found</p>
      )}
    </div>
  );
}

export default Teach;
