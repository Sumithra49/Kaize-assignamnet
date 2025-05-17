// Mock data for analytics service
// In a real application, these would make API calls to the backend

export const fetchOverviewStats = async (filters) => {
  console.log('Fetching overview stats with filters:', filters)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock data
  return {
    totalLeads: {
      value: '1,284',
      trend: 12.5
    },
    conversionRate: {
      value: '15.2%',
      trend: 2.8
    },
    costPerLead: {
      value: '$27.35',
      trend: 3.2
    },
    qualifiedLeads: {
      value: '367',
      trend: 8.7
    }
  }
}

export const fetchConversionData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Generate 30 days of data
  const today = new Date()
  const data = []
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      googleAds: Math.floor(Math.random() * 10) + 10,
      facebook: Math.floor(Math.random() * 8) + 8,
      email: Math.floor(Math.random() * 15) + 15,
      linkedin: Math.floor(Math.random() * 6) + 5
    })
  }
  
  return data
}

export const fetchLeadQualityData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // Mock data
  return [
    { name: 'Hot', value: 214 },
    { name: 'Warm', value: 487 },
    { name: 'Cold', value: 583 }
  ]
}

export const fetchTopCampaigns = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  // Mock data
  return [
    { 
      id: 1, 
      name: 'Google Ads Q1', 
      source: 'Google Ads', 
      leads: 342, 
      conversionRate: 18.5, 
      costPerLead: 32.4, 
      trend: 12.7,
      color: '#EFF6FF'
    },
    { 
      id: 2, 
      name: 'Facebook Spring', 
      source: 'Facebook', 
      leads: 276, 
      conversionRate: 12.8, 
      costPerLead: 24.7, 
      trend: 8.3,
      color: '#F0FDF4'
    },
    { 
      id: 3, 
      name: 'LinkedIn B2B', 
      source: 'LinkedIn', 
      leads: 154, 
      conversionRate: 8.2, 
      costPerLead: 48.3, 
      trend: -2.5,
      color: '#EFF6FF'
    },
    { 
      id: 4, 
      name: 'Email Nurture', 
      source: 'Email', 
      leads: 95, 
      conversionRate: 22.6, 
      costPerLead: 12.1, 
      trend: 15.8,
      color: '#ECFDF5'
    },
    { 
      id: 5, 
      name: 'Instagram Promotion', 
      source: 'Instagram', 
      leads: 187, 
      conversionRate: 10.5, 
      costPerLead: 28.6, 
      trend: 5.2,
      color: '#FEF3C7'
    }
  ]
}