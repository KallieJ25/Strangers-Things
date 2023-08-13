import { NavLink, Link } from "react-router-dom";

function Navbar({ authenticated }) {
  function handleLogOut() {
    if (authenticated !== true || authenticated === "") {
      authenticated = false;
    }
  }
  console.log(authenticated);
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
          {authenticated !== null &&
          authenticated !== "" &&
          authenticated !== false &&
          authenticated ? (
            <>
              <li className="LiNavbar">
                <NavLink to="/Profile" className="linkStyleNavbar">
                  Profile
                </NavLink>
              </li>
              <li className="LiNavbar">
                <NavLink
                  to="/logout"
                  onClick={() => {
                    handleLogOut();
                  }}
                  className="linkStyleNavbar"
                >
                  logout
                </NavLink>
              </li>
            </>
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
