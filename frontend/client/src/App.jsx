import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Teach from './pages/Teach';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syllabus/:subjectId" element={<Syllabus />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/teach/:sectionId" element={<Teach />} />

      </Routes>
    </Router>
  );
}

export default App;
