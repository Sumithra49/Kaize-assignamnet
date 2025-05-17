import { useState, useEffect } from 'react'
import FilterBar from '../components/filters/FilterBar'
import { fetchCampaignDetails } from '../services/campaignService'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import LoadingIndicator from '../components/common/LoadingIndicator'

const CampaignCard = ({ campaign, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-success-500'
      case 'paused':
        return 'text-warning-500'
      case 'ended':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }
  
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-primary-500 bg-primary-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(campaign.id)}
    >
      <div className="flex justify-between">
        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
        <span className={`text-xs font-medium ${getStatusColor(campaign.status)}`}>
          {campaign.status}
        </span>
      </div>
      
      <p className="text-xs text-gray-500 mt-1">{campaign.source}</p>
      
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500">Leads</p>
          <p className="font-medium">{campaign.leads}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Conv.</p>
          <p className="font-medium">{campaign.conversionRate}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Cost/Lead</p>
          <p className="font-medium">${campaign.costPerLead}</p>
        </div>
      </div>
    </div>
  )
}

const CampaignDetailView = ({ campaign, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )
  }
  
  if (!campaign) {
    return (
      <div className="h-full flex justify-center items-center flex-col">
        <p className="text-gray-500">Select a campaign to view details</p>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{campaign.name}</h2>
          <p className="text-sm text-gray-500">{campaign.dateRange}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm">Edit</button>
          <button className="btn btn-primary btn-sm">
            {campaign.status === 'Active' ? 'Pause Campaign' : 'Activate Campaign'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-2xl font-semibold">{campaign.leads}</p>
          <p className="text-xs text-success-500 mt-1">↑ {campaign.leadGrowth}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <p className="text-2xl font-semibold">{campaign.conversionRate}%</p>
          <p className="text-xs text-success-500 mt-1">↑ {campaign.convGrowth}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Cost per Lead</p>
          <p className="text-2xl font-semibold">${campaign.costPerLead}</p>
          <p className="text-xs text-error-500 mt-1">↑ {campaign.cplGrowth}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Budget</p>
          <p className="text-2xl font-semibold">${campaign.budget}</p>
          <p className="text-xs text-gray-500 mt-1">{campaign.budgetSpent}% spent</p>
        </div>
      </div>
      
      {campaign.performanceData && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Daily Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaign.performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="leads" name="Leads" fill="#2563EB" />
                <Bar yAxisId="right" dataKey="conversionRate" name="Conv. Rate (%)" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Lead Quality</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Hot Leads</span>
                <span className="text-xs font-medium text-gray-700">{campaign.leadQuality?.hot || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-error-500 h-2 rounded-full" 
                  style={{ width: `${campaign.leadQuality?.hot || 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Warm Leads</span>
                <span className="text-xs font-medium text-gray-700">{campaign.leadQuality?.warm || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-warning-500 h-2 rounded-full" 
                  style={{ width: `${campaign.leadQuality?.warm || 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Cold Leads</span>
                <span className="text-xs font-medium text-gray-700">{campaign.leadQuality?.cold || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full" 
                  style={{ width: `${campaign.leadQuality?.cold || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Campaign ROI</h3>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-success-500 flex items-center justify-center mr-4">
              <span className="text-lg font-bold text-success-700">{campaign.roi || 0}x</span>
            </div>
            <div>
              <p className="text-sm font-medium">Return on Investment</p>
              <p className="text-xs text-gray-500">Based on lead conversion value</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <p className="text-xs text-gray-500">Total Spend</p>
              <p className="font-medium">${campaign.totalSpend || 0}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Estimated Value</p>
              <p className="font-medium">${campaign.estimatedValue || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [campaignDetails, setCampaignDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Load campaign list
  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const mockCampaigns = [
          { id: 1, name: 'Google Ads Q1 2025', source: 'Google Ads', status: 'Active', leads: 342, conversionRate: 18.5, costPerLead: 32.4 },
          { id: 2, name: 'Facebook Spring Campaign', source: 'Facebook', status: 'Active', leads: 276, conversionRate: 12.8, costPerLead: 24.7 },
          { id: 3, name: 'LinkedIn B2B Outreach', source: 'LinkedIn', status: 'Paused', leads: 154, conversionRate: 8.2, costPerLead: 48.3 },
          { id: 4, name: 'Email Nurture Sequence', source: 'Email', status: 'Active', leads: 95, conversionRate: 22.6, costPerLead: 12.1 },
          { id: 5, name: 'Instagram Reels Promotion', source: 'Instagram', status: 'Ended', leads: 187, conversionRate: 10.5, costPerLead: 28.6 }
        ]
        
        setCampaigns(mockCampaigns)
        // Automatically select the first campaign
        if (mockCampaigns.length > 0 && !selectedCampaign) {
          setSelectedCampaign(mockCampaigns[0].id)
        }
      } catch (error) {
        console.error('Error loading campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCampaigns()
  }, [])
  
  // Load selected campaign details
  useEffect(() => {
    const loadCampaignDetails = async () => {
      if (!selectedCampaign) return
      
      setIsLoading(true)
      try {
        const details = await fetchCampaignDetails(selectedCampaign)
        setCampaignDetails(details)
      } catch (error) {
        console.error('Error loading campaign details:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCampaignDetails()
  }, [selectedCampaign])
  
  return (
    <div className="space-y-6">
      <FilterBar />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">Campaigns</h3>
              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">+ New</button>
            </div>
            
            {isLoading && campaigns.length === 0 ? (
              <div className="py-8 flex justify-center">
                <LoadingIndicator />
              </div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign} 
                    isSelected={selectedCampaign === campaign.id}
                    onSelect={setSelectedCampaign}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white p-6 rounded-lg border border-gray-200 min-h-[600px]">
            <CampaignDetailView 
              campaign={campaignDetails} 
              isLoading={isLoading && selectedCampaign !== null} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignsPage