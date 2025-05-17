import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import CampaignsPage from './pages/CampaignsPage'
import LeadsPage from './pages/LeadsPage'
import SettingsPage from './pages/SettingsPage'
import { initializeSocket } from './services/socketService'
import { DashboardProvider } from './context/DashboardContext'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = initializeSocket()
    
    socket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to socket server')
    })
    
    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from socket server')
    })
    
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <DashboardProvider>
      <Layout socketConnected={isConnected}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </DashboardProvider>
  )
}

export default App