import { createContext, useState, useContext, useEffect } from 'react'
import { fetchOverviewStats } from '../services/analyticsService'

const DashboardContext = createContext()

export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  })
  const [selectedCampaigns, setSelectedCampaigns] = useState([])
  const [selectedLeadSources, setSelectedLeadSources] = useState([])
  const [leadQualityFilter, setLeadQualityFilter] = useState('all')
  const [overviewStats, setOverviewStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Available filter options
  const campaignOptions = [
    { value: 'google-ads-q1', label: 'Google Ads Q1 2025' },
    { value: 'facebook-spring', label: 'Facebook Spring Campaign' },
    { value: 'linkedin-b2b', label: 'LinkedIn B2B Outreach' },
    { value: 'email-nurture', label: 'Email Nurture Sequence' },
    { value: 'instagram-reels', label: 'Instagram Reels Promotion' }
  ]

  const leadSourceOptions = [
    { value: 'google', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'organic', label: 'Organic Search' },
    { value: 'referral', label: 'Referral' }
  ]

  const qualityOptions = [
    { value: 'all', label: 'All Quality Levels' },
    { value: 'hot', label: 'Hot Leads' },
    { value: 'warm', label: 'Warm Leads' },
    { value: 'cold', label: 'Cold Leads' }
  ]

  // Load data when filters change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const stats = await fetchOverviewStats({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          campaigns: selectedCampaigns.map(c => c.value),
          sources: selectedLeadSources.map(s => s.value),
          quality: leadQualityFilter
        })
        setOverviewStats(stats)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [dateRange, selectedCampaigns, selectedLeadSources, leadQualityFilter])

  // Reset filters to defaults
  const resetFilters = () => {
    setDateRange({
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date()
    })
    setSelectedCampaigns([])
    setSelectedLeadSources([])
    setLeadQualityFilter('all')
  }

  const value = {
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
    overviewStats,
    isLoading,
    resetFilters
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}