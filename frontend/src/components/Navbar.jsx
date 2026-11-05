    
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Employee Management System</h2>
        <p>Welcome back! Here's your employee overview.</p>
      </div>

      <div className="navbar-right">
        <button className="notification-btn" aria-label="Notifications">
          🔔
        </button>

        <div className="profile">
          <div className="profile-avatar">KS</div>
          <div>
            <h4>Kajal Singh</h4>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
