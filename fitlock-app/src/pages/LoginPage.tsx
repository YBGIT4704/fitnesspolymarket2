import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signInWithEmail, verifyOtp } = useAuth()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await signInWithEmail(email)
    
    if (error) {
      setMessage('Error sending code. Please try again.')
    } else {
      setMessage('Check your email for the verification code!')
      setStep('code')
    }
    
    setLoading(false)
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await verifyOtp(email, code)
    
    if (error) {
      setMessage('Invalid code. Please try again.')
    } else {
      setMessage('Successfully logged in!')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Animated background blur effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Login Card */}
        <div className="relative bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-8 border border-white/20">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to FitLock
            </h2>
            <p className="mt-3 text-gray-600 font-medium">
              {step === 'email' 
                ? 'Transform your fitness goals into reality' 
                : 'Enter the verification code sent to your email'
              }
            </p>
          </div>
        
        <form className="space-y-6" onSubmit={step === 'email' ? handleEmailSubmit : handleCodeSubmit}>
          <div>
            {step === 'email' ? (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm tracking-widest"
                  placeholder="Enter verification code"
                />
              </div>
            )}
          </div>

          {message && (
            <div className={`rounded-lg p-3 text-sm text-center font-medium ${
              message.includes('Error') || message.includes('Invalid') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (step === 'email' ? 'Send Verification Code' : 'Verify & Sign In')}
            </button>
          </div>

          {step === 'code' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setCode('')
                  setMessage('')
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline transition-colors"
              >
                ← Back to email
              </button>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Commit to your fitness goals and build accountability</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
