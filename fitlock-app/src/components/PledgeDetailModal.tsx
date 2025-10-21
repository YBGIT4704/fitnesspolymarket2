import { useState, useEffect } from 'react'
import { calculatePotentialPayout, calculateOdds, type BetContribution } from '../utils/payoutCalculator'

interface PledgeDetailModalProps {
  pledge: {
    id: string
    goal: string
    deadline: string
    stake: number
    creator_id: string
    creator?: {
      name: string
      profile_picture?: string
    }
    bets?: Array<{
      amount: number
      side: 'yes' | 'no'
      user_id: string
    }>
  }
  userBalance: number
  onClose: () => void
  onPlaceBet: (pledgeId: string, side: 'yes' | 'no', amount: number) => Promise<void>
}

export default function PledgeDetailModal({
  pledge,
  userBalance,
  onClose,
  onPlaceBet
}: PledgeDetailModalProps) {
  const [betSide, setBetSide] = useState<'yes' | 'no'>('yes')
  const [betAmount, setBetAmount] = useState<number>(10)
  const [loading, setLoading] = useState(false)

  // Calculate days remaining
  const daysRemaining = Math.ceil(
    (new Date(pledge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  // Convert bets to BetContribution format
  const bets: BetContribution[] = (pledge.bets || []).map(bet => ({
    userId: bet.user_id,
    amount: bet.amount,
    side: bet.side
  }))

  // Calculate totals
  const yesBetsTotal = bets.filter(b => b.side === 'yes').reduce((sum, b) => sum + b.amount, 0)
  const noBetsTotal = bets.filter(b => b.side === 'no').reduce((sum, b) => sum + b.amount, 0)
  const totalPool = pledge.stake + yesBetsTotal + noBetsTotal

  // Calculate odds
  const { yesPercent, noPercent } = calculateOdds(pledge.stake, bets)

  // Calculate potential payout
  const { potentialPayout, returnMultiplier } = calculatePotentialPayout(
    betAmount,
    betSide,
    pledge.stake,
    bets
  )

  const handlePlaceBet = async () => {
    if (betAmount < 1) {
      alert('Minimum bet is £1')
      return
    }
    if (betAmount > userBalance) {
      alert('Insufficient balance')
      return
    }

    setLoading(true)
    try {
      await onPlaceBet(pledge.id, betSide, betAmount)
      onClose()
    } catch (error) {
      console.error('Failed to place bet:', error)
      alert('Failed to place bet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Preset amounts
  const presetAmounts = [10, 25, 50, 100]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-polymarket-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-polymarket-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-polymarket-card border-b border-polymarket-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-polymarket-text mb-2">
              I will {pledge.goal} by {new Date(pledge.deadline).toLocaleDateString()}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-polymarket-text-muted">
              <span>Created by {pledge.creator?.name || 'Anonymous'}</span>
              <span>•</span>
              <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-polymarket-text-muted hover:text-polymarket-text ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats Section */}
        <div className="p-6 border-b border-polymarket-border">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-polymarket-text-muted text-sm mb-1">Total Pool</div>
              <div className="text-2xl font-bold text-polymarket-text">£{totalPool}</div>
            </div>
            <div>
              <div className="text-polymarket-text-muted text-sm mb-1">YES Odds</div>
              <div className="text-2xl font-bold text-polymarket-success">{yesPercent}%</div>
            </div>
            <div>
              <div className="text-polymarket-text-muted text-sm mb-1">NO Odds</div>
              <div className="text-2xl font-bold text-polymarket-danger">{noPercent}%</div>
            </div>
          </div>
        </div>

        {/* Betting Interface */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-polymarket-text mb-4">Place Your Bet</h3>

          {/* Side Selection */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setBetSide('yes')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                betSide === 'yes'
                  ? 'bg-polymarket-success text-white'
                  : 'bg-polymarket-dark text-polymarket-text-muted hover:text-polymarket-text border border-polymarket-border'
              }`}
            >
              YES {yesPercent}%
            </button>
            <button
              onClick={() => setBetSide('no')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                betSide === 'no'
                  ? 'bg-polymarket-danger text-white'
                  : 'bg-polymarket-dark text-polymarket-text-muted hover:text-polymarket-text border border-polymarket-border'
              }`}
            >
              NO {noPercent}%
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="text-sm text-polymarket-text-muted mb-2 block">Amount (£)</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Math.max(0, Number(e.target.value)))}
              className="w-full bg-polymarket-dark border border-polymarket-border rounded-lg px-4 py-3 text-polymarket-text text-lg font-semibold focus:outline-none focus:border-polymarket-accent"
              min="1"
              max={userBalance}
            />
          </div>

          {/* Preset Amounts */}
          <div className="flex space-x-2 mb-6">
            {presetAmounts.map(amount => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className="px-4 py-2 bg-polymarket-dark border border-polymarket-border rounded-lg text-sm text-polymarket-text hover:bg-polymarket-border transition-colors"
              >
                £{amount}
              </button>
            ))}
            <button
              onClick={() => setBetAmount(userBalance)}
              className="px-4 py-2 bg-polymarket-dark border border-polymarket-border rounded-lg text-sm text-polymarket-text hover:bg-polymarket-border transition-colors"
            >
              Max
            </button>
          </div>

          {/* Potential Payout */}
          <div className="bg-polymarket-dark rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-polymarket-text-muted text-sm">If {betSide.toUpperCase()} wins:</span>
              <span className="text-2xl font-bold text-polymarket-text">
                £{potentialPayout.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-polymarket-text-muted text-sm">Return:</span>
              <span className={`text-lg font-semibold ${
                returnMultiplier >= 1 ? 'text-polymarket-success' : 'text-polymarket-danger'
              }`}>
                {returnMultiplier.toFixed(2)}x (£{(potentialPayout - betAmount).toFixed(2)} profit)
              </span>
            </div>
          </div>

          {/* Place Bet Button */}
          <button
            onClick={handlePlaceBet}
            disabled={loading || betAmount < 1 || betAmount > userBalance || daysRemaining <= 0}
            className="w-full py-4 bg-polymarket-accent text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Placing Bet...' : `Bet £${betAmount} on ${betSide.toUpperCase()}`}
          </button>

          {/* Balance Info */}
          <div className="mt-4 text-center text-sm text-polymarket-text-muted">
            Your balance: £{userBalance}
          </div>
        </div>

        {/* Pool Breakdown */}
        <div className="p-6 bg-polymarket-dark border-t border-polymarket-border">
          <h4 className="text-sm font-semibold text-polymarket-text mb-3">Pool Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-polymarket-text-muted">Pledger Stake:</span>
              <span className="text-polymarket-text font-medium">£{pledge.stake}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-polymarket-text-muted">YES Bets:</span>
              <span className="text-polymarket-success font-medium">£{yesBetsTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-polymarket-text-muted">NO Bets:</span>
              <span className="text-polymarket-danger font-medium">£{noBetsTotal}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-polymarket-border">
              <span className="text-polymarket-text font-semibold">Total Pool:</span>
              <span className="text-polymarket-text font-bold">£{totalPool}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
