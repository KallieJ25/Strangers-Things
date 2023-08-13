import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(
            'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-C/users/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: { username, password },
              }),
            }
          );
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage('Login successful!');
          } else {
            setMessage('Login failed. Please check your credentials and try again.');
            console.error('Login error:', data);
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.');
          console.error('Login error:', error);
        }
      };

    return(
        <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    );
}

export default Login;