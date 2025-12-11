import React, { useState } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";

function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogin = (data) => {
    console.log("Login clicked:", data);
  };

  const handleSignup = (data) => {
    console.log("Signup clicked:", data);
  };

  return (
    <div>
      {/* Header */}
      <Header
        onLoginClick={() => setActiveTab("Login")}
        onSignupClick={() => setActiveTab("Signup")}
      />

      {/* Navbar */}
      <Navbar active={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Login" && <LoginForm onLogin={handleLogin} />}

      {activeTab === "Signup" && <SignupForm onSignup={handleSignup} />}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
