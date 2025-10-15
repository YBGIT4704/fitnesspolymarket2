import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Pledge } from '../types'
import PledgeCard from './PledgeCard'

const PledgeFeed = () => {
  const [pledges, setPledges] = useState<Pledge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPledges()
  }, [])

  const fetchPledges = async () => {
    try {
      const { data, error } = await supabase
        .from('pledges')
        .select(`
          *,
          creator:users!pledges_creator_id_fkey(*),
          bets(*, user:users!bets_user_id_fkey(*))
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching pledges:', error)
        setPledges([])
      } else {
        setPledges(data || [])
      }
    } catch (error) {
      console.error('Error fetching pledges:', error)
      setPledges([])
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Pledges</h2>
      
      {pledges.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pledges yet</h3>
          <p className="mt-1 text-sm text-gray-500">Be the first to create a fitness pledge!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pledges.map((pledge) => (
            <PledgeCard key={pledge.id} pledge={pledge} onUpdate={fetchPledges} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PledgeFeed
