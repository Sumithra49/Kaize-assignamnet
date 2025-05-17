

export const fetchLeads = async () => {
 
  await new Promise(resolve => setTimeout(resolve, 1000))
  
 a
  return generateMockLeads(100)
}


function generateMockLeads(count) {
  const sources = ['Google Ads', 'Facebook', 'LinkedIn', 'Email Campaign', 'Instagram', 'Referral', 'Organic Search']
  const campaigns = ['Spring Promotion', 'Product Launch', 'Brand Awareness', 'Retargeting', 'Newsletter', 'B2B Outreach']
  const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost']
  const qualities = ['Hot', 'Warm', 'Cold']
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'William', 'Emma']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor']
  const companies = ['Acme Inc', 'Tech Solutions', 'Global Services', 'InnovateCorp', 'DataSystems', 'Marketing Pro', 'Creative Media']
  
  const leads = []
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const campaign = campaigns[Math.floor(Math.random() * campaigns.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const quality = qualities[Math.floor(Math.random() * qualities.length)]
    const company = companies[Math.floor(Math.random() * companies.length)]
    
    // Generate a random date within the last 90 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 90))
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    
    leads.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      company,
      source,
      campaign: `${source} ${campaign}`,
      date: formattedDate,
      status,
      quality
    })
  }
  
  // Sort by date (newest first)
  leads.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return leads
}