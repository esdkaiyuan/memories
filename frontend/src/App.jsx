import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import MemoryManagePage from './pages/MemoryManagePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage" element={<MemoryManagePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;