import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

interface ProfileProps {
  onSignOut: () => void
}

const Profile = ({ onSignOut }: ProfileProps) => {
  const [stats, setStats] = useState({
    totalPledges: 0,
    completedPledges: 0,
    totalBets: 0,
    successfulBets: 0,
    totalWinnings: 0,
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    if (!user) return

    try {
      // Get user's pledges
      const { data: pledges, error: pledgesError } = await supabase
        .from('pledges')
        .select('status')
        .eq('creator_id', user.id)

      if (pledgesError) throw pledgesError

      // Get user's bets
      const { data: bets, error: betsError } = await supabase
        .from('bets')
        .select(`
          side,
          pledge:pledges!bets_pledge_id_fkey(status)
        `)
        .eq('user_id', user.id)

      if (betsError) throw betsError

      const totalPledges = pledges?.length || 0
      const completedPledges = pledges?.filter(p => p.status === 'completed').length || 0
      const totalBets = bets?.length || 0
      
      // Calculate successful bets (simplified - would need more complex logic for real implementation)
      const successfulBets = bets?.filter(bet => {
        if (bet.pledge?.status === 'completed') return bet.side === 'yes'
        if (bet.pledge?.status === 'failed') return bet.side === 'no'
        return false
      }).length || 0

      setStats({
        totalPledges,
        completedPledges,
        totalBets,
        successfulBets,
        totalWinnings: 0, // Would need to calculate based on actual winnings
      })
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const successRate = stats.totalPledges > 0 ? Math.round((stats.completedPledges / stats.totalPledges) * 100) : 0
  const bettingAccuracy = stats.totalBets > 0 ? Math.round((stats.successfulBets / stats.totalBets) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
      
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl font-medium text-gray-700">
              {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {user?.user_metadata?.name || 'Anonymous User'}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-md p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Balance</span>
            <span className="text-2xl font-bold text-blue-900">
              £{user?.user_metadata?.gbp_balance || 1000}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.totalPledges}</div>
            <div className="text-sm text-gray-500">Total Pledges</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{successRate}%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.totalBets}</div>
            <div className="text-sm text-gray-500">Total Bets</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{bettingAccuracy}%</div>
            <div className="text-sm text-gray-500">Betting Accuracy</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-2">
          {stats.completedPledges >= 1 && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🏆</span>
              <span className="text-sm text-gray-700">First Pledge Completed</span>
            </div>
          )}
          {stats.completedPledges >= 5 && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🥇</span>
              <span className="text-sm text-gray-700">Pledge Master (5+ completed)</span>
            </div>
          )}
          {stats.totalBets >= 10 && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🎯</span>
              <span className="text-sm text-gray-700">Active Bettor (10+ bets)</span>
            </div>
          )}
          {bettingAccuracy >= 80 && stats.totalBets >= 5 && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🔮</span>
              <span className="text-sm text-gray-700">Prediction Master (80%+ accuracy)</span>
            </div>
          )}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="text-center">
        <button
          onClick={onSignOut}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Profile
