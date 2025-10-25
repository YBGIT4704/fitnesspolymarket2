import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface LoginFormProps {
  onLoginSuccess: () => void
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const redirectUri = `${window.location.origin}/auth/callback`
      console.log('Redirect URI being sent:', redirectUri)
      console.log('Current origin:', window.location.origin)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) throw error
    } catch (error) {
      console.error('Google login error:', error)
      setMessage('Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      setIsEmailSent(true)
      setMessage('Check your email for the magic link!')
    } catch (error) {
      console.error('Magic link error:', error)
      setMessage('Failed to send magic link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-8 w-full text-center">
          <div className="w-16 h-16 bg-polymarket-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-polymarket-text mb-4">Check Your Email</h2>
          <p className="text-polymarket-text-muted mb-6">
            We've sent a magic link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-polymarket-text-muted mb-6">
            Click the link in your email to sign in. You can close this tab.
          </p>
          <button
            onClick={() => {
              setIsEmailSent(false)
              setEmail('')
              setMessage('')
            }}
            className="text-polymarket-accent hover:text-polymarket-text transition-colors"
          >
            Try a different email
          </button>
        </div>
    )
  }

  return (
    <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-8 w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-polymarket-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <h1 className="text-3xl font-bold text-polymarket-text mb-2">FitLock</h1>
          <p className="text-polymarket-text-muted">Fitness accountability platform</p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-polymarket-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-polymarket-card text-polymarket-text-muted">or</span>
            </div>
          </div>

          {/* Magic Link Form */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-polymarket-text mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-3 bg-polymarket-dark border border-polymarket-border rounded-lg text-polymarket-text placeholder-polymarket-text-muted focus:outline-none focus:ring-2 focus:ring-polymarket-accent focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-polymarket-accent hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            message.includes('Check your email') 
              ? 'bg-green-900/20 text-green-400 border border-green-800' 
              : 'bg-red-900/20 text-red-400 border border-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-polymarket-text-muted">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
  )
}

export default LoginForm