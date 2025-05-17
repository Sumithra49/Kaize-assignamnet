import { NavLink } from 'react-router-dom'
import { FaTimes, FaTachometerAlt, FaBullhorn, FaUserFriends, FaCog } from 'react-icons/fa'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: FaTachometerAlt },
    { name: 'Campaigns', href: '/campaigns', icon: FaBullhorn },
    { name: 'Leads', href: '/leads', icon: FaUserFriends },
    { name: 'Settings', href: '/settings', icon: FaCog },
  ]

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity md:hidden ${
          sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-30 w-64 bg-white shadow-lg transform transition duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
              </svg>
            </div>
            <div className="ml-2">
              <h2 className="text-xl font-bold text-primary-600">LeadPulse</h2>
            </div>
          </div>
          <button
            className="md:hidden rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <FaTimes className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 bg-white px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className={`mr-3 h-5 w-5 flex-shrink-0`} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="bg-primary-50 rounded-md p-3">
            <h4 className="text-sm font-medium text-primary-800">Pro Tips</h4>
            <p className="mt-1 text-xs text-primary-600">
              Customize your dashboard layout in the settings for better insights.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar