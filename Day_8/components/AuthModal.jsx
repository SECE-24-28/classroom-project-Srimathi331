import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
    <>
      {isLogin ? (
        <Login onClose={onClose} onSwitch={handleSwitch} />
      ) : (
        <Signup onClose={onClose} onSwitch={handleSwitch} />
      )}
    </>
  );
}
