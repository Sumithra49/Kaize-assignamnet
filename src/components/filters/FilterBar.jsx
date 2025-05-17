import { useState } from 'react'
import DateRangePicker from 'react-datepicker'
import Select from 'react-select'
import { FaCalendarAlt, FaFilter, FaTimes, FaSyncAlt } from 'react-icons/fa'
import { useDashboard } from '../../context/DashboardContext'
import 'react-datepicker/dist/react-datepicker.css'

const FilterBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    dateRange,
    setDateRange,
    selectedCampaigns,
    setSelectedCampaigns,
    selectedLeadSources,
    setSelectedLeadSources,
    leadQualityFilter,
    setLeadQualityFilter,
    campaignOptions,
    leadSourceOptions,
    qualityOptions,
    resetFilters,
    isLoading
  } = useDashboard()

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates
    setDateRange({ startDate: start, endDate: end || start })
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Custom styles for react-select
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: '#D1D5DB',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#9CA3AF',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#EFF6FF',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#1D4ED8',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#1D4ED8',
      '&:hover': {
        backgroundColor: '#DBEAFE',
        color: '#1E40AF',
      },
    }),
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${isExpanded ? 'mb-6' : 'mb-4'}`}>
      <div className="px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-1">
          <FaFilter className="text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          
          <div className="relative ml-4">
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <DateRangePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={handleDateRangeChange}
                selectsRange
                className="text-sm border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dateFormat="MMM d, yyyy"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={resetFilters}
            disabled={isLoading}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center mr-3"
          >
            <FaSyncAlt className="mr-1" /> Reset
          </button>
          
          <button
            onClick={toggleExpand}
            className="text-xs text-primary-600 hover:text-primary-800 flex items-center ml-2"
          >
            {isExpanded ? (
              <>
                <FaTimes className="mr-1" /> Collapse
              </>
            ) : (
              <>
                <span className="mr-1">+</span> More Filters
              </>
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-200 animate-enter">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="campaigns" className="block text-xs font-medium text-gray-700 mb-1">
                Campaigns
              </label>
              <Select
                id="campaigns"
                isMulti
                options={campaignOptions}
                value={selectedCampaigns}
                onChange={setSelectedCampaigns}
                placeholder="Select campaigns..."
                styles={selectStyles}
                className="text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="leadSources" className="block text-xs font-medium text-gray-700 mb-1">
                Lead Sources
              </label>
              <Select
                id="leadSources"
                isMulti
                options={leadSourceOptions}
                value={selectedLeadSources}
                onChange={setSelectedLeadSources}
                placeholder="Select lead sources..."
                styles={selectStyles}
                className="text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="leadQuality" className="block text-xs font-medium text-gray-700 mb-1">
                Lead Quality
              </label>
              <Select
                id="leadQuality"
                options={qualityOptions}
                value={qualityOptions.find(option => option.value === leadQualityFilter)}
                onChange={(selected) => setLeadQualityFilter(selected.value)}
                styles={selectStyles}
                className="text-sm"
              />
            </div>
          </div>
          
          <div className="mt-4 text-right">
            <span className="text-xs text-gray-500">
              Showing data for {selectedCampaigns.length || 'all'} campaigns from {selectedLeadSources.length || 'all'} lead sources
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar