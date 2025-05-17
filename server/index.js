import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173', // Vite dev server
    methods: ['GET', 'POST'],
    credentials: true
  }
})

// Middleware
app.use(cors())
app.use(express.json())

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// Analytics endpoints
app.get('/api/analytics/overview', (req, res) => {
  // Parse query parameters for filters
  const { startDate, endDate, campaigns, sources, quality } = req.query
  
  // In a real app, this would query a database
  // Mock data response
  res.json({
    totalLeads: {
      value: '1,284',
      trend: 12.5
    },
    conversionRate: {
      value: '15.2%',
      trend: 2.8
    },
    costPerLead: {
      value: '$27.35',
      trend: 3.2
    },
    qualifiedLeads: {
      value: '367',
      trend: 8.7
    }
  })
})

app.get('/api/analytics/conversion', (req, res) => {
  // Generate 30 days of data
  const today = new Date()
  const data = []
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      googleAds: Math.floor(Math.random() * 10) + 10,
      facebook: Math.floor(Math.random() * 8) + 8,
      email: Math.floor(Math.random() * 15) + 15,
      linkedin: Math.floor(Math.random() * 6) + 5
    })
  }
  
  res.json(data)
})

app.get('/api/analytics/lead-quality', (req, res) => {
  res.json([
    { name: 'Hot', value: 214 },
    { name: 'Warm', value: 487 },
    { name: 'Cold', value: 583 }
  ])
})

app.get('/api/campaigns/top', (req, res) => {
  res.json([
    { 
      id: 1, 
      name: 'Google Ads Q1', 
      source: 'Google Ads', 
      leads: 342, 
      conversionRate: 18.5, 
      costPerLead: 32.4, 
      trend: 12.7 
    },
    { 
      id: 2, 
      name: 'Facebook Spring', 
      source: 'Facebook', 
      leads: 276, 
      conversionRate: 12.8, 
      costPerLead: 24.7, 
      trend: 8.3 
    },
    { 
      id: 3, 
      name: 'LinkedIn B2B', 
      source: 'LinkedIn', 
      leads: 154, 
      conversionRate: 8.2, 
      costPerLead: 48.3, 
      trend: -2.5 
    },
    { 
      id: 4, 
      name: 'Email Nurture', 
      source: 'Email', 
      leads: 95, 
      conversionRate: 22.6, 
      costPerLead: 12.1, 
      trend: 15.8 
    },
    { 
      id: 5, 
      name: 'Instagram Promotion', 
      source: 'Instagram', 
      leads: 187, 
      conversionRate: 10.5, 
      costPerLead: 28.6, 
      trend: 5.2 
    }
  ])
})

// Socket.io 
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  // Emit a welcome message
  socket.emit('welcome', { message: 'Connected to LeadPulse Analytics server' })
  
  // Handle real-time data subscriptions
  socket.on('subscribe', (channel) => {
    console.log(`Client ${socket.id} subscribed to ${channel}`)
    socket.join(channel)
  })
  
  socket.on('unsubscribe', (channel) => {
    console.log(`Client ${socket.id} unsubscribed from ${channel}`)
    socket.leave(channel)
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Simulate real-time data updates
setInterval(() => {
  // Generate a fake new lead
  const newLead = {
    id: Math.floor(Math.random() * 10000),
    source: ['Google Ads', 'Facebook', 'LinkedIn', 'Email', 'Organic'][Math.floor(Math.random() * 5)],
    timestamp: new Date().toISOString()
  }
  
  io.emit('new-lead', newLead)
}, 120000) // Every 2 minutes