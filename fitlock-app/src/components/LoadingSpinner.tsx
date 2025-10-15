const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        
        {/* Loading spinner */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-white font-semibold text-lg">Loading FitLock...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
