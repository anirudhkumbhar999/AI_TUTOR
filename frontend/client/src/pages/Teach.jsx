// frontend/src/pages/Teach.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import LeetCodeLogin from "../components/LeetCodeLogin";

function Teach() {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(true);

  // Doubt chat
  const [doubtInput, setDoubtInput] = useState("");
  const [doubtConversation, setDoubtConversation] = useState([]);

  // LeetCode problems
  const [problems, setProblems] = useState([]);
  const [leetcodeConnected, setLeetcodeConnected] = useState(false);

  // 1️⃣ Fetch section info & AI teaching
  useEffect(() => {
    async function fetchData() {
      try {
        const sectionRes = await axios.get(`/api/syllabus/section/${sectionId}`);
        setSection(sectionRes.data);

        const aiRes = await axios.post("/api/chat/teach", { sectionId });
        setAiResponse(aiRes.data.response);

        setLoading(false);
      } catch (err) {
        console.error("❌ Teach page error:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, [sectionId]);

  // 2️⃣ Fetch LeetCode problems
  const fetchProblems = async () => {
    if (!section?.sectionTitle) return;
    try {
      const res = await axios.get(`/api/leetcode/problems/${section.sectionTitle}`);
      setProblems(res.data);
    } catch (err) {
      console.error("❌ Error fetching problems:", err);
    }
  };

  // 3️⃣ Send doubt
  const sendDoubt = async () => {
    if (!doubtInput.trim()) return;

    setDoubtConversation((prev) => [...prev, { role: "user", content: doubtInput }]);

    try {
      const res = await axios.post("/api/chat/doubt", {
        sectionId,
        question: doubtInput,
        conversation: [
          { role: "assistant", content: aiResponse },
          ...doubtConversation,
          { role: "user", content: doubtInput },
        ],
      });

      setDoubtConversation((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);
    } catch (err) {
      console.error("❌ Doubt chat error:", err);
    }

    setDoubtInput("");
  };

  if (loading) return <p>Loading teaching material...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      {/* Left Side: AI Teaching & Doubt Chat */}
      <div style={{ flex: 2 }}>
        {section ? (
          <>
            <h2>📘 {section.sectionTitle}</h2>
            <p>{section.content}</p>

            {/* AI Teaching */}
            <div style={{ marginTop: "2rem", padding: "1rem", background: "#f4f4f4", borderRadius: "8px" }}>
              <h3>🤖 AI Teaching:</h3>
              {aiResponse ? (
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>
              ) : (
                <p>Generating AI teaching...</p>
              )}
            </div>

            {/* Doubt Chat */}
            <div style={{ marginTop: "2rem", padding: "1rem", background: "#eef", borderRadius: "8px" }}>
              <h3>💬 Ask a Doubt</h3>
              <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "1rem" }}>
                {doubtConversation.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: "0.5rem",
                      textAlign: msg.role === "user" ? "right" : "left",
                    }}
                  >
                    <strong>{msg.role === "user" ? "You" : "Tutor"}:</strong>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  value={doubtInput}
                  onChange={(e) => setDoubtInput(e.target.value)}
                  placeholder="Type your doubt..."
                  style={{ flex: 1, padding: "0.5rem" }}
                />
                <button onClick={sendDoubt} style={{ padding: "0.5rem 1rem" }}>
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Section not found</p>
        )}
      </div>

      {/* Right Side: LeetCode Panel */}
      <div style={{ flex: 1, padding: "1rem", background: "#fff8f0", borderRadius: "8px" }}>
        <h3>🔥 LeetCode Problems</h3>
        {!leetcodeConnected ? (
          <LeetCodeLogin
            onConnected={() => {
              setLeetcodeConnected(true);
              fetchProblems();
            }}
          />
        ) : problems.length === 0 ? (
          <p>No problems loaded</p>
        ) : (
          problems.map((p) => (
            <div key={p.titleSlug} style={{ marginBottom: "0.5rem" }}>
              <a
                href={`https://leetcode.com/problems/${p.titleSlug}`}
                target="_blank"
                rel="noreferrer"
              >
                {p.title}
              </a>{" "}
              ({p.difficulty})
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teach;
