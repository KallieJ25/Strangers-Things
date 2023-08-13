import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Componants/Login'
import Register from './Componants/Register'

function App() {
  return (
    <Router>
      <div>
        <h1>Stangers Things</h1>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
