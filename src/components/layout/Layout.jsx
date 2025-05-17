import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { IoMdWarning } from 'react-icons/io'

const Layout = ({ children, socketConnected }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  // Derive page title from current route
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Dashboard'
      case '/campaigns':
        return 'Campaign Analytics'
      case '/leads':
        return 'Lead Management'
      case '/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle={getPageTitle()}
        />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 md:px-6 lg:px-8">
          {!socketConnected && (
            <div className="mb-4 bg-warning-50 border border-warning-200 text-warning-800 px-4 py-3 rounded-md flex items-center">
              <IoMdWarning className="mr-2 flex-shrink-0 text-warning-500" size={20} />
              <span>Real-time data connection unavailable. Some data may not be up-to-date.</span>
            </div>
          )}
          
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout