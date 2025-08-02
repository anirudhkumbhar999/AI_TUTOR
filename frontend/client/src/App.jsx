// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Teach from './pages/Teach';
import Login from './pages/Login';       // ✅ Import Login
import Register from './pages/Register'; // ✅ Import Register

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syllabus/:subjectId" element={<Syllabus />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/teach/:sectionId" element={<Teach />} />

        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
