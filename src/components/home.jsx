import { Link } from "react-router-dom";
function Home({ authenticated, userName }) {
  return (
    <>
      <div className="container-center">
        <h1 id="welcomeToHomePage">Welcome to Stanger&apos;s Things</h1>
        {authenticated ? (
          <>
            <h3 id="userNameHomePage">Logged in as {userName}</h3>
            <Link className="sendMessageButton loginButton" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <Link className="sendMessageButton loginButton" to="/login">
            Login
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
