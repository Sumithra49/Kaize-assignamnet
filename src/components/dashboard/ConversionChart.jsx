import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FaChartLine, FaExternalLinkAlt, FaDownload } from 'react-icons/fa'
import LoadingIndicator from '../common/LoadingIndicator'
import { format } from 'date-fns'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="text-xs font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center mt-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-xs text-gray-700">
              {entry.name}: <span className="font-medium">{entry.value}%</span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

const ConversionChart = ({ data, isLoading }) => {
  const [timeFrame, setTimeFrame] = useState('daily')
  
  const timeFrameOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ]
  
  // Format x-axis date labels based on selected timeframe
  const formatXAxis = (tickItem) => {
    if (timeFrame === 'daily') {
      return format(new Date(tickItem), 'MMM d')
    } else if (timeFrame === 'weekly') {
      return `Week ${format(new Date(tickItem), 'w')}`
    } else {
      return format(new Date(tickItem), 'MMM yy')
    }
  }
  
  return (
    <div className="chart-container">
      <div className="chart-header flex items-center justify-between">
        <div className="flex items-center">
          <FaChartLine className="text-primary-600 mr-2" size={16} />
          <h3 className="text-sm font-medium text-gray-900">Conversion Rates by Channel</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 text-xs">
            {timeFrameOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  timeFrame === option.value
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setTimeFrame(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <FaDownload size={14} />
          </button>
          
          <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <FaExternalLinkAlt size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-4 h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingIndicator />
          </div>
        ) : data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={formatXAxis}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
                unit="%" 
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                align="right" 
                verticalAlign="top"
                height={36}
                iconSize={8}
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="googleAds" 
                name="Google Ads"
                stroke="#2563EB" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="facebook" 
                name="Facebook"
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="email" 
                name="Email"
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="linkedin" 
                name="LinkedIn"
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center flex-col">
            <p className="text-gray-500 text-sm">No data available</p>
            <p className="text-gray-400 text-xs mt-1">Try changing your filter settings</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversionChart