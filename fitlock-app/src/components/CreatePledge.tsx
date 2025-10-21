import { useState } from 'react'

interface CreatePledgeProps {
  userBalance: number
  onClose: () => void
  onSubmit: (goal: string, deadline: string, stake: number) => Promise<void>
}

const CreatePledge = ({ userBalance, onClose, onSubmit }: CreatePledgeProps) => {
  const [goal, setGoal] = useState('')
  const [deadline, setDeadline] = useState('')
  const [stake, setStake] = useState(50)
  const [loading, setLoading] = useState(false)

  // Calculate minimum date (tomorrow) and maximum date (1 year from now)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
  const maxDate = oneYearFromNow.toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!goal.trim()) {
      alert('Please enter a goal')
      return
    }

    if (!deadline) {
      alert('Please select a deadline')
      return
    }

    if (stake < 1) {
      alert('Minimum stake is £1')
      return
    }

    if (stake > userBalance) {
      alert(`Insufficient balance. You have £${userBalance}`)
      return
    }

    setLoading(true)
    try {
      await onSubmit(goal, deadline, stake)
    } catch (error) {
      console.error('Error creating pledge:', error)
      alert('Error creating pledge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Preview of pledge statement
  const pledgeStatement = goal && deadline
    ? `I will ${goal} by ${new Date(deadline).toLocaleDateString()}`
    : 'Your pledge will appear here...'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-polymarket-card rounded-2xl border border-polymarket-border p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-polymarket-text">Create a Pledge</h2>
          <button
            onClick={onClose}
            className="text-polymarket-text-muted hover:text-polymarket-text"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Guidance Prompt */}
        <div className="bg-polymarket-dark border-l-4 border-polymarket-accent rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <div className="text-polymarket-text font-medium mb-1">Make it a sweet spot!</div>
              <p className="text-sm text-polymarket-text-muted leading-relaxed">
                Your goal should be <strong>ambitious enough</strong> that people will bet against you,
                but <strong>achievable enough</strong> that you can actually complete it. Find the perfect balance!
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Input */}
          <div>
            <label className="block text-sm font-medium text-polymarket-text mb-2">
              What's your goal?
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-polymarket-dark border border-polymarket-border rounded-lg px-4 py-3 text-polymarket-text placeholder-polymarket-text-muted focus:outline-none focus:border-polymarket-accent"
              placeholder="e.g., run a half marathon under 2 hours"
              maxLength={200}
            />
            <div className="text-xs text-polymarket-text-muted mt-1">{goal.length}/200 characters</div>
          </div>

          {/* Deadline Date Picker */}
          <div>
            <label className="block text-sm font-medium text-polymarket-text mb-2">
              By when?
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={minDate}
              max={maxDate}
              className="w-full bg-polymarket-dark border border-polymarket-border rounded-lg px-4 py-3 text-polymarket-text focus:outline-none focus:border-polymarket-accent"
            />
            <div className="text-xs text-polymarket-text-muted mt-1">
              Between tomorrow and 1 year from now
            </div>
          </div>

          {/* Stake Amount */}
          <div>
            <label className="block text-sm font-medium text-polymarket-text mb-2">
              How much is this worth to you? (Stake)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-polymarket-text text-lg font-semibold">
                £
              </span>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                className="w-full bg-polymarket-dark border border-polymarket-border rounded-lg pl-8 pr-4 py-3 text-polymarket-text text-lg font-semibold focus:outline-none focus:border-polymarket-accent"
                min="1"
                max={userBalance}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-polymarket-text-muted">
                Your balance: £{userBalance}
              </div>
              <div className="flex space-x-2">
                {[10, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setStake(Math.min(amount, userBalance))}
                    className="px-3 py-1 text-xs bg-polymarket-dark border border-polymarket-border rounded-lg text-polymarket-text hover:bg-polymarket-border transition-colors"
                  >
                    £{amount}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-polymarket-dark rounded-lg p-4 border border-polymarket-border">
            <div className="text-xs text-polymarket-text-muted mb-2">Preview:</div>
            <div className="text-lg font-semibold text-polymarket-text">
              {pledgeStatement}
            </div>
            {goal && deadline && (
              <div className="text-sm text-polymarket-text-muted mt-2">
                Staking £{stake} • {Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to complete
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !goal || !deadline || stake < 1 || stake > userBalance}
            className="w-full py-4 bg-polymarket-accent text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Pledge...' : `Create Pledge for £${stake}`}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-polymarket-dark text-polymarket-text-muted font-medium rounded-lg hover:text-polymarket-text transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePledge
