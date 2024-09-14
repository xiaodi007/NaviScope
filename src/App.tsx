import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HFSimulation from './pages/hfs';
import SmartInvestPage from './pages/SmartInvestPage';
import DonationsPage from './pages/DonationsPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* 确保内容不被固定的导航栏遮挡 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool1" element={<HFSimulation />} />
          <Route path="/tool2" element={<SmartInvestPage />} />
          <Route path="/donations" element={<DonationsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
