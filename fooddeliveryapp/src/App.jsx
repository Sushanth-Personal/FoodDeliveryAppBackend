
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components for the pages
import LoginPage from './pages/LoginPage';  // Assume you have a LoginPage component
import HomePage from './pages/HomePage';    // Assume you have a HomePage component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for the login and home pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        
        {/* Optionally, set a default route if needed */}
        <Route path="/" element={<HomePage />} />  {/* Default to HomePage if no route matches */}
      </Routes>
    </Router>
  );
}

export default App;
