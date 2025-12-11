function Header({ onLoginClick, onSignupClick }) {
  return (
    <header>
      {/* Left: Logo */}
      <div className="logo">
        <h2>RechaGo</h2> {/* Replace with actual logo */}
      </div>

      {/* Center: Search */}
      <div className="search">
        <input type="text" placeholder="Search plans, offers..." />
      </div>

      {/* Right: Login / Signup */}
      <div className="actions">
        <button onClick={onLoginClick}>Login</button>
        <button onClick={onSignupClick}>Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
