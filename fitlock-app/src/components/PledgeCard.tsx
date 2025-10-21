import type { Pledge } from '../types'
import { calculateOdds, type BetContribution } from '../utils/payoutCalculator'

interface PledgeCardProps {
  pledge: Pledge
  onClick: () => void
}

const PledgeCard = ({ pledge, onClick }: PledgeCardProps) => {
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

  // Convert bets to calculator format
  const bets: BetContribution[] = (pledge.bets || []).map(bet => ({
    userId: bet.user_id,
    amount: bet.amount,
    side: bet.side
  }))

  // Calculate totals and odds
  const totalYesBets = bets.filter(b => b.side === 'yes').reduce((sum, b) => sum + b.amount, 0)
  const totalNoBets = bets.filter(b => b.side === 'no').reduce((sum, b) => sum + b.amount, 0)
  const totalPool = pledge.stake + totalYesBets + totalNoBets
  const { yesPercent, noPercent } = calculateOdds(pledge.stake, bets)

  return (
    <div
      onClick={onClick}
      className="bg-polymarket-card rounded-xl border border-polymarket-border hover:border-polymarket-accent transition-all cursor-pointer overflow-hidden"
    >
      {/* Header with user info */}
      <div className="p-4 border-b border-polymarket-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-polymarket-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {pledge.creator?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-polymarket-text">{pledge.creator?.name || 'Anonymous'}</p>
            <p className="text-xs text-polymarket-text-muted">{formatDeadline(pledge.deadline)}</p>
          </div>
        </div>

        {/* Pledge statement */}
        <h3 className="text-base font-semibold text-polymarket-text leading-tight">
          I will {pledge.goal} by {new Date(pledge.deadline).toLocaleDateString()}
        </h3>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-polymarket-text-muted mb-1">Total Pool</div>
            <div className="text-lg font-bold text-polymarket-text">£{totalPool}</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <div className="text-sm font-bold text-polymarket-success">{yesPercent}%</div>
              <div className="text-xs text-polymarket-text-muted">YES</div>
            </div>
            <div className="text-polymarket-text-muted">/</div>
            <div className="text-center">
              <div className="text-sm font-bold text-polymarket-danger">{noPercent}%</div>
              <div className="text-xs text-polymarket-text-muted">NO</div>
            </div>
          </div>
        </div>

        {/* Click to bet prompt */}
        <div className="text-center py-2 px-3 bg-polymarket-dark rounded-lg text-sm text-polymarket-text-muted">
          Click to place bet →
        </div>
      </div>
    </div>
  )
}

export default PledgeCard
