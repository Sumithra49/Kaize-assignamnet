import { useEffect, useState } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaFilter, FaEllipsisH } from 'react-icons/fa'
import LoadingIndicator from '../common/LoadingIndicator'

const LEADS_PER_PAGE = 10
const TOTAL_VISIBLE_PAGES = 5

const getQualityTag = (quality) => {
  switch (quality.toLowerCase()) {
    case 'hot':
      return <span className="tag tag-red">Hot</span>
    case 'warm':
      return <span className="tag tag-orange">Warm</span>
    case 'cold':
      return <span className="tag tag-blue">Cold</span>
    default:
      return <span className="tag tag-blue">Unknown</span>
  }
}

const getStatusTag = (status) => {
  switch (status.toLowerCase()) {
    case 'new':
      return <span className="tag tag-blue">New</span>
    case 'contacted':
      return <span className="tag tag-orange">Contacted</span>
    case 'qualified':
      return <span className="tag tag-green">Qualified</span>
    case 'converted':
      return <span className="tag tag-green">Converted</span>
    case 'lost':
      return <span className="tag tag-red">Lost</span>
    default:
      return <span className="tag tag-blue">Unknown</span>
  }
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const halfVisible = Math.floor(TOTAL_VISIBLE_PAGES / 2)
    let startPage = Math.max(currentPage - halfVisible, 1)
    let endPage = Math.min(startPage + TOTAL_VISIBLE_PAGES - 1, totalPages)
    
    if (endPage - startPage + 1 < TOTAL_VISIBLE_PAGES) {
      startPage = Math.max(endPage - TOTAL_VISIBLE_PAGES + 1, 1)
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }
  
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * LEADS_PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * LEADS_PER_PAGE, totalPages * LEADS_PER_PAGE)}
            </span>{' '}
            of <span className="font-medium">{totalPages * LEADS_PER_PAGE}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              &laquo;
            </button>
            
            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === currentPage
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              &raquo;
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

const LeadsTable = ({ leads = [], isLoading }) => {
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }
  
  // Get sort icon
  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return <FaSort className="ml-1 h-3 w-3 text-gray-400" />
    }
    return sortOrder === 'asc' ? (
      <FaSortUp className="ml-1 h-3 w-3 text-gray-900" />
    ) : (
      <FaSortDown className="ml-1 h-3 w-3 text-gray-900" />
    )
  }
  
  // Sort and paginate data
  const sortedLeads = [...leads].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })
  
  const totalPages = Math.ceil(sortedLeads.length / LEADS_PER_PAGE)
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * LEADS_PER_PAGE,
    currentPage * LEADS_PER_PAGE
  )
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1)
  }, [leads, sortBy, sortOrder])
  
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">Leads</h3>
          <div className="flex space-x-2">
            <button className="btn btn-secondary btn-sm">
              <FaFilter className="mr-1 h-3 w-3" /> Filter
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <LoadingIndicator />
        </div>
      </div>
    )
  }
  
  if (leads.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">Leads</h3>
          <div className="flex space-x-2">
            <button className="btn btn-secondary btn-sm">
              <FaFilter className="mr-1 h-3 w-3" /> Filter
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col p-8">
          <p className="text-gray-500 text-sm">No leads found</p>
          <p className="text-gray-400 text-xs mt-1">Try changing your filter settings</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Leads</h3>
        <div className="flex space-x-2">
          <button className="btn btn-secondary btn-sm">
            <FaFilter className="mr-1 h-3 w-3" /> Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="table-header px-6 py-3 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Lead {getSortIcon('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="table-header px-6 py-3 cursor-pointer"
                onClick={() => handleSort('source')}
              >
                <div className="flex items-center">
                  Source {getSortIcon('source')}
                </div>
              </th>
              <th 
                scope="col" 
                className="table-header px-6 py-3 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date {getSortIcon('date')}
                </div>
              </th>
              <th 
                scope="col" 
                className="table-header px-6 py-3 cursor-pointer"
                onClick={() => handleSort('quality')}
              >
                <div className="flex items-center">
                  Quality {getSortIcon('quality')}
                </div>
              </th>
              <th 
                scope="col" 
                className="table-header px-6 py-3 cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
              <th scope="col" className="table-header px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="data-cell">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </div>
                </td>
                <td className="data-cell">
                  <div className="text-sm text-gray-900">{lead.source}</div>
                  <div className="text-xs text-gray-500">{lead.campaign}</div>
                </td>
                <td className="data-cell">
                  <div className="text-sm text-gray-900">{lead.date}</div>
                </td>
                <td className="data-cell">
                  {getQualityTag(lead.quality)}
                </td>
                <td className="data-cell">
                  {getStatusTag(lead.status)}
                </td>
                <td className="data-cell text-right">
                  <button className="text-gray-400 hover:text-gray-500">
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default LeadsTable