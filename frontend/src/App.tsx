
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Tasks from "./pages/Tasks";
import Agent from "./pages/Agent";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />       
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/tasks" element={ <Tasks />} />
        <Route path = "/agent/:id" element={<Agent />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
