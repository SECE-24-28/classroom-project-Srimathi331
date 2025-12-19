import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Plans from "./pages/Plans";
import Payment from "./pages/Payment";
import History from "./pages/RechargeHistory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar always visible */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/plans" element={<Plans />} /> {/* Public */}
          <Route path="/payment" element={<Payment />} /> {/* Can keep public or protected as needed */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
