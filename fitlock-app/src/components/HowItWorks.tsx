export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-polymarket-text mb-2 text-center">
        How FitLock Works
      </h1>
      <p className="text-polymarket-text-muted text-center mb-12">
        Put your money where your fitness goals are
      </p>

      {/* 3-Step Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Step 1 */}
        <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-6 hover:border-polymarket-accent transition-all">
          <div className="w-12 h-12 bg-polymarket-accent rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="text-xl font-semibold text-polymarket-text mb-3">Make a Pledge</h3>
          <p className="text-polymarket-text-muted text-sm leading-relaxed">
            Set a fitness goal, stake money on it, and choose a deadline. The stake shows how committed you are!
          </p>
          <div className="mt-4 bg-polymarket-dark rounded-lg p-3 text-sm">
            <div className="text-polymarket-text-muted mb-1">Example:</div>
            <div className="text-polymarket-text">"I will run a half marathon under 2 hours by Dec 31"</div>
            <div className="text-polymarket-success mt-2 font-semibold">Stake: £50</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-6 hover:border-polymarket-accent transition-all">
          <div className="w-12 h-12 bg-polymarket-accent rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="text-xl font-semibold text-polymarket-text mb-3">Others Bet</h3>
          <p className="text-polymarket-text-muted text-sm leading-relaxed">
            People bet on whether you'll succeed (YES) or fail (NO). The pool grows with each bet!
          </p>
          <div className="mt-4 bg-polymarket-dark rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-polymarket-text-muted">YES Bets:</span>
              <span className="text-polymarket-success font-semibold">£80</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-polymarket-text-muted">NO Bets:</span>
              <span className="text-polymarket-danger font-semibold">£30</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-polymarket-border">
              <span className="text-sm text-polymarket-text font-semibold">Total Pool:</span>
              <span className="text-polymarket-text font-bold">£160</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-6 hover:border-polymarket-accent transition-all">
          <div className="w-12 h-12 bg-polymarket-accent rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="text-xl font-semibold text-polymarket-text mb-3">Prove It</h3>
          <p className="text-polymarket-text-muted text-sm leading-relaxed">
            Submit proof by the deadline. Community votes to verify. Winners split the pool proportionally!
          </p>
          <div className="mt-4 bg-polymarket-dark rounded-lg p-3">
            <div className="text-sm text-polymarket-text-muted mb-2">If you succeed:</div>
            <div className="text-sm text-polymarket-text mb-1">
              You + YES bettors split £160 based on contributions
            </div>
            <div className="text-polymarket-success text-sm font-semibold mt-3">
              🎉 You get: £61 (£11 profit!)
            </div>
          </div>
        </div>
      </div>

      {/* Payout Explanation */}
      <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-8 mb-8">
        <h3 className="text-xl font-semibold text-polymarket-text mb-4">💰 How Payouts Work</h3>
        <div className="space-y-4 text-polymarket-text-muted">
          <p className="leading-relaxed">
            <strong className="text-polymarket-text">Simple proportional split:</strong> Winners split the entire pool based on how much they contributed.
          </p>

          <div className="bg-polymarket-dark rounded-lg p-4">
            <div className="text-sm text-polymarket-text font-semibold mb-3">Example Scenario:</div>
            <div className="space-y-2 text-sm">
              <div>• You pledge: £50</div>
              <div>• 3 people bet YES: £80 total</div>
              <div>• 2 people bet NO: £30 total</div>
              <div className="text-polymarket-accent font-semibold">Total Pool: £160</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-polymarket-dark rounded-lg p-4 border-l-4 border-polymarket-success">
              <div className="text-polymarket-success font-semibold mb-2">If You Succeed (YES wins):</div>
              <div className="text-sm space-y-1">
                <div>Total YES contributions: £50 + £80 = £130</div>
                <div className="text-polymarket-text">Your share: (£50 / £130) × £160 = <strong>£61</strong></div>
                <div className="text-polymarket-success">Profit: £11 ✓</div>
              </div>
            </div>

            <div className="bg-polymarket-dark rounded-lg p-4 border-l-4 border-polymarket-danger">
              <div className="text-polymarket-danger font-semibold mb-2">If You Fail (NO wins):</div>
              <div className="text-sm space-y-1">
                <div>Your £50 stake goes to NO bettors</div>
                <div className="text-polymarket-text">NO bettors split £160 proportionally</div>
                <div className="text-polymarket-danger">You get: £0 ✗</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-polymarket-card rounded-xl border border-polymarket-border p-8">
        <h3 className="text-xl font-semibold text-polymarket-text mb-4">💡 Tips for Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="text-polymarket-text font-medium mb-1">Make it ambitious</div>
              <div className="text-sm text-polymarket-text-muted">
                Goals that are too easy won't attract NO bets. Challenge yourself!
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-polymarket-text font-medium mb-1">But keep it achievable</div>
              <div className="text-sm text-polymarket-text-muted">
                You need to actually be able to complete it. Find the sweet spot!
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-2xl">💪</div>
            <div>
              <div className="text-polymarket-text font-medium mb-1">Stake what matters</div>
              <div className="text-sm text-polymarket-text-muted">
                A good stake shows you're serious and attracts more bettors.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-2xl">📸</div>
            <div>
              <div className="text-polymarket-text font-medium mb-1">Document your journey</div>
              <div className="text-sm text-polymarket-text-muted">
                Good proof makes verification easy. Photos, videos, or Strava links work!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-polymarket-text mb-3">
          Ready to commit to your fitness goals?
        </h3>
        <p className="text-polymarket-text-muted mb-6">
          Start with mock money, real accountability
        </p>
        <button className="px-8 py-4 bg-polymarket-accent text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors text-lg">
          Make Your First Pledge
        </button>
      </div>
    </div>
  )
}
