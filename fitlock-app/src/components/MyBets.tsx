import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Bet, Pledge } from '../types'
import { useAuth } from '../hooks/useAuth'

const MyBets = () => {
  const [bets, setBets] = useState<(Bet & { pledge: Pledge })[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMyBets()
    }
  }, [user])

  const fetchMyBets = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('bets')
        .select(`
          *,
          pledge:pledges!bets_pledge_id_fkey(
            *,
            creator:users!pledges_creator_id_fkey(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBets(data || [])
    } catch (error) {
      console.error('Error fetching my bets:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expired'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days left`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bets</h2>
      
      {bets.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bets yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start betting on fitness pledges!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bets.map((bet) => (
            <div key={bet.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{bet.pledge.goal}</h3>
                  <p className="text-sm text-gray-500">by {bet.pledge.creator?.name || 'Anonymous'}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    bet.side === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {bet.side.toUpperCase()}
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">£{bet.amount}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>Pledge Stake: £{bet.pledge.stake}</p>
                <p>Deadline: {new Date(bet.pledge.deadline).toLocaleDateString()}</p>
                <p>{formatDeadline(bet.pledge.deadline)}</p>
              </div>

              {bet.pledge.image_url && (
                <div className="mb-4">
                  <img
                    src={bet.pledge.image_url}
                    alt="Pledge"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="bg-gray-50 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Pledge Status</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  bet.pledge.status === 'open' ? 'bg-green-100 text-green-800' :
                  bet.pledge.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  bet.pledge.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {bet.pledge.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBets
