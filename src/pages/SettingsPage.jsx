import { useState } from 'react'
import { FaSave, FaExclamationTriangle } from 'react-icons/fa'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState({
    companyName: 'Marketing Pro Agency',
    fullName: 'Alex Morgan',
    email: 'alex@marketingpro.com',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    emailNotifications: true,
    weeklyReports: true,
    leadAlerts: true,
    apiKey: 'mp_8f7d9c2e5a3b1f4d6e8a9c2d5f6g7h8j',
    customDomain: 'dashboard.marketingpro.com',
    dashboardLayout: 'standard'
  })
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const tabs = [
    { id: 'account', label: 'Account Settings' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'advanced', label: 'Advanced' }
  ]
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                <p className="mt-1 text-sm text-gray-500">Update your account details and preferences.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    id="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    name="dateFormat"
                    id="dateFormat"
                    value={formData.dateFormat}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  >
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="CAD">Canadian Dollar (CA$)</option>
                    <option value="AUD">Australian Dollar (A$)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Dashboard Preferences</h3>
                
                <div>
                  <label htmlFor="dashboardLayout" className="block text-sm font-medium text-gray-700">
                    Default Dashboard Layout
                  </label>
                  <select
                    name="dashboardLayout"
                    id="dashboardLayout"
                    value={formData.dashboardLayout}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  >
                    <option value="standard">Standard</option>
                    <option value="compact">Compact</option>
                    <option value="detailed">Detailed</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-secondary mr-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex items-center">
                    <FaSave className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <p className="mt-1 text-sm text-gray-500">Configure how you receive notifications and alerts.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                    <p className="text-gray-500">Receive email notifications for important updates and alerts.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyReports"
                      name="weeklyReports"
                      type="checkbox"
                      checked={formData.weeklyReports}
                      onChange={handleInputChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="weeklyReports" className="font-medium text-gray-700">Weekly Performance Reports</label>
                    <p className="text-gray-500">Receive weekly reports summarizing campaign performance and lead generation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="leadAlerts"
                      name="leadAlerts"
                      type="checkbox"
                      checked={formData.leadAlerts}
                      onChange={handleInputChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="leadAlerts" className="font-medium text-gray-700">Lead Alerts</label>
                    <p className="text-gray-500">Get notified when new high-quality leads are captured.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-secondary mr-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex items-center">
                    <FaSave className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Integrations</h3>
                <p className="mt-1 text-sm text-gray-500">Connect your marketing tools and platforms.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Google Ads</h4>
                      <p className="text-xs text-gray-500">Connected</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Configure</button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Facebook Ads</h4>
                      <p className="text-xs text-gray-500">Connected</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Configure</button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">LinkedIn Ads</h4>
                      <p className="text-xs text-gray-500">Connected</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Configure</button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Mailchimp</h4>
                      <p className="text-xs text-red-500">Not Connected</p>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Connect</button>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-primary">
                    Add New Integration
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Advanced Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Configure advanced features and API access.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-warning-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">API Access</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Keep your API key secret. Do not share it in client-side code or public repositories.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                  API Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="apiKey"
                    id="apiKey"
                    value={formData.apiKey}
                    readOnly
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700">
                  Custom Domain
                </label>
                <input
                  type="text"
                  name="customDomain"
                  id="customDomain"
                  value={formData.customDomain}
                  onChange={handleInputChange}
                  className="mt-1 input-field"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a custom domain to white-label your dashboard (requires DNS configuration).
                </p>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-secondary mr-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex items-center">
                    <FaSave className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage