import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// Import your components for the pages
import LoginPage from "./pages/LoginPage"; // Assume you have a LoginPage component
import HomePage from "./pages/HomePage/HomePage"; // Assume you have a HomePage component
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for the login and home pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout/:userId" element={<CheckoutPage />} />
        <Route path="/checkout/" element={<CheckoutPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />{" "}
        <Route path="*" element={<ErrorPage />} />
      
       
      </Routes>
    </Router>
  );
}

export default App;
