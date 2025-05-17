import { FaArrowUp, FaArrowDown, FaChartBar } from 'react-icons/fa'
import LoadingIndicator from '../common/LoadingIndicator'

const TopCampaignsTable = ({ campaigns, isLoading }) => {
  if (isLoading) {
    return (
      <div className="chart-container">
        <div className="chart-header flex items-center">
          <FaChartBar className="text-primary-600 mr-2" size={16} />
          <h3 className="text-sm font-medium text-gray-900">Top Performing Campaigns</h3>
        </div>
        <div className="p-6 flex justify-center">
          <LoadingIndicator />
        </div>
      </div>
    )
  }
  
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-header flex items-center">
          <FaChartBar className="text-primary-600 mr-2" size={16} />
          <h3 className="text-sm font-medium text-gray-900">Top Performing Campaigns</h3>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">No campaign data available</p>
          <p className="text-gray-400 text-xs mt-1">Try changing your filter settings</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="chart-container">
      <div className="chart-header flex items-center justify-between">
        <div className="flex items-center">
          <FaChartBar className="text-primary-600 mr-2" size={16} />
          <h3 className="text-sm font-medium text-gray-900">Top Performing Campaigns</h3>
        </div>
        <div>
          <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white">
            <option value="leads">By Leads</option>
            <option value="conversion">By Conversion</option>
            <option value="roi">By ROI</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="table-header px-6 py-3">Campaign</th>
              <th className="table-header px-6 py-3 text-right">Leads</th>
              <th className="table-header px-6 py-3 text-right">Conv. Rate</th>
              <th className="table-header px-6 py-3 text-right">Cost/Lead</th>
              <th className="table-header px-6 py-3 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign, index) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="data-cell">
                  <div className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                      style={{ backgroundColor: campaign.color || '#EFF6FF' }}
                    >
                      <span className="text-xs font-medium text-primary-700">
                        {campaign.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{campaign.source}</p>
                    </div>
                  </div>
                </td>
                <td className="data-cell text-right font-medium">{campaign.leads}</td>
                <td className="data-cell text-right">{campaign.conversionRate}%</td>
                <td className="data-cell text-right">${campaign.costPerLead}</td>
                <td className="data-cell text-right">
                  <div className="flex items-center justify-end">
                    {campaign.trend > 0 ? (
                      <span className="text-success-500 flex items-center">
                        <FaArrowUp className="h-3 w-3 mr-1" />
                        {campaign.trend}%
                      </span>
                    ) : (
                      <span className="text-error-500 flex items-center">
                        <FaArrowDown className="h-3 w-3 mr-1" />
                        {Math.abs(campaign.trend)}%
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 border-t border-gray-100">
        <button className="text-xs text-primary-600 hover:text-primary-800 font-medium">
          View all campaigns
        </button>
      </div>
    </div>
  )
}

export default TopCampaignsTable