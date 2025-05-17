import { io } from 'socket.io-client'

let socket

export const initializeSocket = () => {
  // In a real app, this would connect to the actual backend socket server
  // For this demo, we'll just simulate the connection
  if (!socket) {
    // Simulated socket with the same interface
    socket = {
      connected: false,
      on: (event, callback) => {
        if (event === 'connect') {
          // Simulate connect after a short delay
          setTimeout(() => {
            socket.connected = true
            callback()
          }, 1000)
        }
      },
      emit: (event, data) => {
        console.log(`Emitted ${event} with data:`, data)
      },
      disconnect: () => {
        socket.connected = false
        console.log('Socket disconnected')
      }
    }
  }
  
  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initializeSocket()
  }
  return socket
}