import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="brandName">
          STRANGER&apos;S THINGS
        </Link>
        <ul className="navbar-nav">
          <li className="LiNavbar">
            <NavLink to="/" className="linkStyleNavbar">
              Home
            </NavLink>
          </li>
          <li className="LiNavbar">
            <NavLink to="/Posts" className="linkStyleNavbar">
              Posts
            </NavLink>
          </li>
          <li className="LiNavbar">
            <NavLink to="/Profile" className="linkStyleNavbar">
              Profile
            </NavLink>
          </li>
          <li className="LiNavbar">
            <NavLink to="/logout" className="linkStyleNavbar">
              logout
            </NavLink>
          </li>
          <li className="LiNavbar">
            <NavLink to="/login" className="linkStyleNavbar">
              Login
            </NavLink>
          </li>
          <li className="LiNavbar">
            <NavLink to="/register" className="linkStyleNavbar">
              register
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
