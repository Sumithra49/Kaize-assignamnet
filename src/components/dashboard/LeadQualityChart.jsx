import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { FaChartPie } from 'react-icons/fa'
import LoadingIndicator from '../common/LoadingIndicator'

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="text-xs font-medium">{payload[0].name} Leads</p>
        <p className="text-xs mt-1">
          <span className="font-medium">{payload[0].value}</span> leads ({payload[0].payload.percentage}%)
        </p>
      </div>
    )
  }
  return null
}

// Custom legend
const CustomLegend = (props) => {
  const { payload } = props
  
  return (
    <ul className="flex justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-700">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

const LeadQualityChart = ({ data, isLoading }) => {
  // Define colors for each lead quality segment
  const COLORS = ['#EF4444', '#F97316', '#10B981']
  
  // Generate percentage values for display
  const totalLeads = data ? data.reduce((acc, item) => acc + item.value, 0) : 0
  const dataWithPercentage = data ? data.map(item => ({
    ...item,
    percentage: totalLeads > 0 ? Math.round((item.value / totalLeads) * 100) : 0
  })) : []
  
  return (
    <div className="chart-container">
      <div className="chart-header flex items-center">
        <FaChartPie className="text-primary-600 mr-2" size={16} />
        <h3 className="text-sm font-medium text-gray-900">Lead Quality Distribution</h3>
      </div>
      
      <div className="p-4" style={{ height: "240px" }}>
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingIndicator />
          </div>
        ) : data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center flex-col">
            <p className="text-gray-500 text-sm">No data available</p>
            <p className="text-gray-400 text-xs mt-1">Try changing your filter settings</p>
          </div>
        )}
      </div>
      
      {data && data.length > 0 && !isLoading && (
        <div className="px-4 pb-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
          {dataWithPercentage.map((item, index) => (
            <div key={`stat-${index}`} className="text-center">
              <p className="text-xs font-medium text-gray-500">{item.name}</p>
              <p className="text-lg font-medium" style={{ color: COLORS[index] }}>
                {item.value}
              </p>
              <p className="text-xs text-gray-400">
                {item.percentage}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LeadQualityChart