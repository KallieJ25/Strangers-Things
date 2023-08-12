import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <h1>Login</h1>
      <p className="centerText">
        Don&apos;t have an account? &nbsp;
        <Link to="/register" className="linkStyle">
          Signup
        </Link>
      </p>
    </>
  );
}

export default Login;
