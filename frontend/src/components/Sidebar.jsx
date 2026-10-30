const Sidebar = ()=>{
const menuItems = [
  "Dashboard",
  "Employees",
  "Add Employee",
  "Attendance",
  "Reports",
  "Settings",
  "Logout"
];
    return(
        <div>
            <h2>EMS Portal</h2>
            <ul>
               {menuItems.map((item, index) => (
  <li key={index}>{item}</li>
))}
            </ul>
        </div>
    )
}
export default Sidebar;