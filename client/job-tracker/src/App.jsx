import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetail';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:companyId" element={<CompanyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
