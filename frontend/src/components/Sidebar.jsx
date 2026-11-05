
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Employees", icon: "♙" },
    { name: "Add Employee", icon: "+" },
    { name: "Attendance", icon: "◷" },
    { name: "Reports", icon: "▤" },
    { name: "Settings", icon: "⚙" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">E</div>
        <div>
          <h2>EMS Portal</h2>
          <span>Management System</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">MAIN MENU</p>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`sidebar-link ${
                  activeItem === item.name ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <span className="menu-icon">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-link">
          <span className="menu-icon">↪</span>
          Logout
        </button>
        <p>EMS Portal v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
