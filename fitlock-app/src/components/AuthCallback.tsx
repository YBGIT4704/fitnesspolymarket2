import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import LoadingSpinner from './LoadingSpinner'

interface AuthCallbackProps {
  onAuthSuccess: () => void
}

const AuthCallback = ({ onAuthSuccess }: AuthCallbackProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setError('Authentication failed. Please try again.')
          return
        }

        if (data.session) {
          // User is authenticated, create or update their profile
          await createOrUpdateUserProfile(data.session.user)
          onAuthSuccess()
        } else {
          setError('No session found. Please try signing in again.')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [onAuthSuccess])

  const createOrUpdateUserProfile = async (user: any) => {
    try {
      // Check if user profile already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!existingUser) {
        // Create new user profile
        const { error } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            gbp_balance: 1000, // Starting balance
            profile_picture: user.user_metadata?.avatar_url || null
          })

        if (error) {
          console.error('Error creating user profile:', error)
        }
      } else {
        // Update existing user profile with latest info
        const { error } = await supabase
          .from('users')
          .update({
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || existingUser.name,
            profile_picture: user.user_metadata?.avatar_url || existingUser.profile_picture
          })
          .eq('id', user.id)

        if (error) {
          console.error('Error updating user profile:', error)
        }
      }
    } catch (err) {
      console.error('Error in createOrUpdateUserProfile:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-polymarket-dark flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-polymarket-text-muted mt-4">Completing sign in...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-polymarket-dark flex items-center justify-center p-4">
        <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-polymarket-text mb-4">Sign In Failed</h2>
          <p className="text-polymarket-text-muted mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-polymarket-accent hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default AuthCallback
