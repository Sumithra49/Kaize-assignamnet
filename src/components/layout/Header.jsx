import { useState, useRef, useEffect } from 'react'
import { FaBars, FaBell, FaUser, FaQuestionCircle } from 'react-icons/fa'
import { format } from 'date-fns'

const Header = ({ sidebarOpen, setSidebarOpen, pageTitle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const mockNotifications = [
    { id: 1, title: 'New leads', message: '15 new leads from Facebook campaign', time: '10 min ago', read: false },
    { id: 2, title: 'Campaign ended', message: 'LinkedIn B2B Outreach campaign has ended', time: '1 hour ago', read: false },
    { id: 3, title: 'Weekly report', message: 'Your weekly performance report is available', time: '1 day ago', read: true }
  ]

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8">
      <div className="flex items-center">
        <button
          type="button"
          className="md:hidden h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <FaBars className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 ml-2 md:ml-0">
          {pageTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-1 md:gap-3">
        <div className="hidden md:block">
          <p className="text-sm text-gray-500">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        
        <div className="relative" ref={notificationRef}>
          <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <span className="sr-only">Notifications</span>
            <FaBell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-error-500 text-white text-xs">
              {mockNotifications.filter(n => !n.read).length}
            </span>
          </button>
          
          {notificationsOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-dropdown bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-enter">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                </div>
                {mockNotifications.length > 0 ? (
                  <div>
                    {mockNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${notification.read ? 'border-transparent' : 'border-primary-500'}`}
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-xs text-center border-t border-gray-100">
                      <button className="text-primary-600 hover:text-primary-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-500">No new notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center text-sm p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <FaUser className="h-4 w-4" />
            </div>
          </button>
          
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-dropdown bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-enter">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Alex Morgan</p>
                  <p className="text-xs text-gray-500">alex@marketingpro.com</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          )}
        </div>
        
        <button className="ml-1 p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <span className="sr-only">Help</span>
          <FaQuestionCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export default Header