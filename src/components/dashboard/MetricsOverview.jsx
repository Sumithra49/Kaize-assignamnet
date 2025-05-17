import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import LoadingIndicator from '../common/LoadingIndicator'
import { useDashboard } from '../../context/DashboardContext'

const MetricCard = ({ title, value, change, icon: Icon, isLoading, trend = null }) => {
  let trendColor = 'text-gray-500'
  let trendIcon = null
  
  if (trend !== null) {
    if (trend > 0) {
      trendColor = 'text-success-500'
      trendIcon = <FaArrowUp className="h-3 w-3 mr-1" />
    } else if (trend < 0) {
      trendColor = 'text-error-500'
      trendIcon = <FaArrowDown className="h-3 w-3 mr-1" />
    }
  }
  
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <div className="h-8 flex items-center mt-1">
              <LoadingIndicator size="sm" />
            </div>
          ) : (
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          )}
        </div>
        <div className="p-2 bg-primary-50 rounded-md">
          <Icon className="h-5 w-5 text-primary-600" />
        </div>
      </div>
      {!isLoading && trend !== null && (
        <p className={`mt-2 text-xs flex items-center ${trendColor}`}>
          {trendIcon}
          <span>{Math.abs(trend)}% {trend >= 0 ? 'increase' : 'decrease'}</span>
          <span className="text-gray-400 ml-1">{change}</span>
        </p>
      )}
    </div>
  )
}

const MetricsOverview = ({ 
  totalLeads, 
  conversionRate, 
  averageCost, 
  qualifiedLeads,
  icons 
}) => {
  const { isLoading } = useDashboard()
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Leads"
        value={totalLeads?.value || "0"}
        change="vs. previous period"
        icon={icons.leads}
        isLoading={isLoading}
        trend={totalLeads?.trend}
      />
      
      <MetricCard
        title="Conversion Rate"
        value={conversionRate?.value || "0%"}
        change="vs. previous period"
        icon={icons.conversion}
        isLoading={isLoading}
        trend={conversionRate?.trend}
      />
      
      <MetricCard
        title="Cost per Lead"
        value={averageCost?.value || "$0"}
        change="vs. previous period"
        icon={icons.cost}
        isLoading={isLoading}
        trend={averageCost?.trend * -1} // Invert trend for cost metrics
      />
      
      <MetricCard
        title="Qualified Leads"
        value={qualifiedLeads?.value || "0"}
        change="vs. previous period"
        icon={icons.qualified}
        isLoading={isLoading}
        trend={qualifiedLeads?.trend}
      />
    </div>
  )
}

export default MetricsOverview