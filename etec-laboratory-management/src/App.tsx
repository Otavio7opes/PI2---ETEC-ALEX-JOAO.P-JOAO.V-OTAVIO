import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LabTechnicianDashboard from './pages/LabTechnicianDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/lab-technician" replace />} />
          <Route path="/lab-technician" element={<LabTechnicianDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

