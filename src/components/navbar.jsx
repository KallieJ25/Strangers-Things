import { NavLink, Link } from "react-router-dom";

function Navbar({ isAuthor }) {
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
          {isAuthor !== null || isAuthor ? (
            <li className="LiNavbar">
              <NavLink to="/logout" className="linkStyleNavbar">
                logout
              </NavLink>
            </li>
          ) : (
            <>
              <li className="LiNavbar">
                <NavLink to="/login" className="linkStyleNavbar">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
