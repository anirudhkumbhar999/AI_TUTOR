import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teach from './pages/Teach';
import Syllabus from './pages/Syllabus';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teach" element={<Teach />} />
        <Route path="/syllabus" element={<Syllabus />} />
      </Routes>
    </Router>
  );
}

export default App;
