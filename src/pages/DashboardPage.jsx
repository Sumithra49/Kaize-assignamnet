import { useEffect, useState } from 'react'
import FilterBar from '../components/filters/FilterBar'
import MetricsOverview from '../components/dashboard/MetricsOverview'
import ConversionChart from '../components/dashboard/ConversionChart'
import LeadQualityChart from '../components/dashboard/LeadQualityChart'
import TopCampaignsTable from '../components/dashboard/TopCampaignsTable'
import { useDashboard } from '../context/DashboardContext'
import { 
  FaUserPlus, 
  FaPercent, 
  FaDollarSign, 
  FaCheckCircle
} from 'react-icons/fa'
import { 
  fetchConversionData,
  fetchLeadQualityData, 
  fetchTopCampaigns
} from '../services/analyticsService'

const DashboardPage = () => {
  const { overviewStats, isLoading } = useDashboard()
  const [conversionData, setConversionData] = useState([])
  const [leadQualityData, setLeadQualityData] = useState([])
  const [topCampaigns, setTopCampaigns] = useState([])
  
  // Icons for metric cards
  const metricIcons = {
    leads: FaUserPlus,
    conversion: FaPercent,
    cost: FaDollarSign,
    qualified: FaCheckCircle
  }
  
  // Load additional data for charts and tables
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [conversionData, qualityData, campaignsData] = await Promise.all([
          fetchConversionData(),
          fetchLeadQualityData(),
          fetchTopCampaigns()
        ])
        
        setConversionData(conversionData)
        setLeadQualityData(qualityData)
        setTopCampaigns(campaignsData)
      } catch (error) {
        console.error('Error loading dashboard components:', error)
      }
    }
    
    loadDashboardData()
  }, [])
  
  return (
    <div className="space-y-6">
      <FilterBar />
      
      <MetricsOverview 
        totalLeads={overviewStats?.totalLeads}
        conversionRate={overviewStats?.conversionRate}
        averageCost={overviewStats?.costPerLead}
        qualifiedLeads={overviewStats?.qualifiedLeads}
        icons={metricIcons}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConversionChart 
            data={conversionData} 
            isLoading={isLoading} 
          />
        </div>
        <div>
          <LeadQualityChart 
            data={leadQualityData} 
            isLoading={isLoading} 
          />
        </div>
      </div>
      
      <TopCampaignsTable 
        campaigns={topCampaigns} 
        isLoading={isLoading} 
      />
    </div>
  )
}

export default DashboardPage