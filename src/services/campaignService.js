// Mock service for campaign data
// In a real app, this would make API calls to the backend

export const fetchCampaignDetails = async (campaignId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  // Mock campaign details
  const campaignDetails = {
    id: campaignId,
    name: 'Google Ads Q1 2025',
    status: 'Active',
    dateRange: 'Jan 1, 2025 - Mar 31, 2025',
    source: 'Google Ads',
    leads: 342,
    leadGrowth: 12.7,
    conversionRate: 18.5,
    convGrowth: 8.3,
    costPerLead: 32.4,
    cplGrowth: 2.1,
    budget: 12000,
    budgetSpent: 76,
    totalSpend: 9120,
    estimatedValue: 42560,
    roi: 4.7,
    leadQuality: {
      hot: 28,
      warm: 42,
      cold: 30
    },
    performanceData: generateDailyPerformanceData()
  }
  
  return campaignDetails
}

// Helper to generate random daily performance data
function generateDailyPerformanceData() {
  const data = []
  const startDate = new Date('2025-01-01')
  
  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    // Generate random data with some trends
    const dayOfWeek = currentDate.getDay()
    const weekMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.2
    
    const baseLeads = 3 + Math.floor(Math.random() * 8)
    let leads = Math.max(1, Math.floor(baseLeads * weekMultiplier))
    
    // Add some trend - increasing over time
    leads = Math.floor(leads * (1 + (i / 180)))
    
    // Random conversion rate between 15-25%
    const conversionRate = 15 + Math.floor(Math.random() * 10)
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      leads,
      conversionRate
    })
  }
  
  return data
}