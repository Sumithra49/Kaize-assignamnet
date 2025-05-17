const LoadingIndicator = ({ size = "md" }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-gray-200 border-t-primary-600 rounded-full animate-spin`}></div>
    </div>
  )
}

export default LoadingIndicator