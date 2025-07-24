import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TablesPage from './pages/TablesPage'
import AdminPage from './pages/AdminPage'
import ReservationPage from './pages/ReservationPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </div>
  )
}

export default App