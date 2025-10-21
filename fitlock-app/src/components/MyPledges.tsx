import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Pledge } from '../types'
import { useAuth } from '../hooks/useAuth'

const MyPledges = () => {
  const [pledges, setPledges] = useState<Pledge[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMyPledges()
    }
  }, [user])

  const fetchMyPledges = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('pledges')
        .select(`
          *,
          bets(*, user:users!bets_user_id_fkey(*))
        `)
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPledges(data || [])
    } catch (error) {
      console.error('Error fetching my pledges:', error)
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Pledges</h2>
      
      {pledges.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pledges yet</h3>
          <p className="mt-1 text-sm text-gray-500">Create your first fitness pledge!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pledges.map((pledge) => (
            <div key={pledge.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{pledge.goal}</h3>
                  <p className="text-sm text-gray-500">Stake: £{pledge.stake}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  pledge.status === 'open' ? 'bg-green-100 text-green-800' :
                  pledge.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  pledge.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {pledge.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>Deadline: {new Date(pledge.deadline).toLocaleDateString()}</p>
                <p>{formatDeadline(pledge.deadline)}</p>
              </div>

              {pledge.image_url && (
                <div className="mb-4">
                  <img
                    src={pledge.image_url}
                    alt="Pledge"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="bg-gray-50 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Betting Pool</h4>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-medium">YES: £{pledge.bets?.filter(bet => bet.side === 'yes').reduce((sum, bet) => sum + bet.amount, 0) || 0}</span>
                    <span className="text-gray-500">({pledge.bets?.filter(bet => bet.side === 'yes').length || 0} bets)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-medium">NO: £{pledge.bets?.filter(bet => bet.side === 'no').reduce((sum, bet) => sum + bet.amount, 0) || 0}</span>
                    <span className="text-gray-500">({pledge.bets?.filter(bet => bet.side === 'no').length || 0} bets)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPledges
