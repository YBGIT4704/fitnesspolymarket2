import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Pledge } from '../types'
import { useAuth } from '../hooks/useAuth'

interface PledgeCardProps {
  pledge: Pledge
  onUpdate: () => void
}

const PledgeCard = ({ pledge, onUpdate }: PledgeCardProps) => {
  const [betAmount, setBetAmount] = useState(10)
  const [betSide, setBetSide] = useState<'yes' | 'no' | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleBet = async () => {
    if (!user || !betSide) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('bets')
        .insert({
          user_id: user.id,
          pledge_id: pledge.id,
          side: betSide,
          amount: betAmount,
        })

      if (error) throw error
      
      // Update user balance
      const { error: balanceError } = await supabase
        .from('users')
        .update({ gbp_balance: user.user_metadata?.gbp_balance - betAmount })
        .eq('id', user.id)

      if (balanceError) throw balanceError

      onUpdate()
      setBetSide(null)
    } catch (error) {
      console.error('Error placing bet:', error)
      alert('Error placing bet. Please try again.')
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

  const totalYesBets = pledge.bets?.filter(bet => bet.side === 'yes').reduce((sum, bet) => sum + bet.amount, 0) || 0
  const totalNoBets = pledge.bets?.filter(bet => bet.side === 'no').reduce((sum, bet) => sum + bet.amount, 0) || 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {pledge.creator?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{pledge.creator?.name || 'Anonymous'}</p>
          <p className="text-xs text-gray-500">{formatDeadline(pledge.deadline)}</p>
        </div>
      </div>

      {/* Pledge Content */}
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-900 mb-2">{pledge.goal}</p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Stake: £{pledge.stake}</span>
          <span>Deadline: {new Date(pledge.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Image */}
      {pledge.image_url && (
        <div className="mb-4">
          <img
            src={pledge.image_url}
            alt="Pledge"
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}

      {/* Betting Pool */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-medium">YES: £{totalYesBets}</span>
            <span className="text-gray-500">({pledge.bets?.filter(bet => bet.side === 'yes').length || 0} bets)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-medium">NO: £{totalNoBets}</span>
            <span className="text-gray-500">({pledge.bets?.filter(bet => bet.side === 'no').length || 0} bets)</span>
          </div>
        </div>
      </div>

      {/* Betting Interface */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setBetSide('yes')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              betSide === 'yes'
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            YES
          </button>
          <button
            onClick={() => setBetSide('no')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              betSide === 'no'
                ? 'bg-red-100 text-red-800 border-2 border-red-500'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            NO
          </button>
        </div>

        {betSide && (
          <div className="flex space-x-2">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              min="1"
              max={user?.user_metadata?.gbp_balance || 1000}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bet amount"
            />
            <button
              onClick={handleBet}
              disabled={loading || betAmount < 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Betting...' : 'Bet'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PledgeCard
