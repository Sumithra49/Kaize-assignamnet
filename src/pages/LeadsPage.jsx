import { useState, useEffect } from 'react'
import FilterBar from '../components/filters/FilterBar'
import LeadsTable from '../components/leads/LeadsTable'
import { fetchLeads } from '../services/leadsService'
import { FaPlus, FaSearch, FaDownload, FaUpload } from 'react-icons/fa'

const LeadsPage = () => {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Load leads data
  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true)
      try {
        const leadsData = await fetchLeads()
        setLeads(leadsData)
      } catch (error) {
        console.error('Error loading leads:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadLeads()
  }, [])
  
  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <FilterBar />
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search leads by name, email, or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center">
            <FaUpload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="btn btn-secondary flex items-center">
            <FaDownload className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn btn-primary flex items-center">
            <FaPlus className="h-4 w-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">All Leads</h3>
          <p className="text-sm text-gray-500">{filteredLeads.length} leads</p>
        </div>
        
        <LeadsTable leads={filteredLeads} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default LeadsPage