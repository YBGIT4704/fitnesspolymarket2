import { useState } from 'react'

// Mock data - Polymarket style with proper binary outcomes
const SAMPLE_PLEDGES = [
  {
    id: '1',
    title: 'Will Alex complete marathon training?',
    question: 'Alex Chen pledges to run a half marathon under 2 hours by December 31',
    outcomes: [
      { name: 'Yes', percent: 58, side: 'yes' },
      { name: 'No', percent: 42, side: 'no' },
    ],
    volume: '2.1k',
    type: 'binary',
    icon: '🏃‍♂️'
  },
  {
    id: '2',
    title: 'Who will lose 20 pounds first?',
    question: 'Weight loss challenge by June 1',
    outcomes: [
      { name: 'Sarah Johnson', percent: 42, side: 'neutral' },
      { name: 'Mike Torres', percent: 38, side: 'neutral' },
      { name: 'Emma Davis', percent: 20, side: 'neutral' },
    ],
    volume: '1.8k',
    type: 'multi',
    icon: '⚖️'
  },
  {
    id: '3',
    title: 'Will Mike hit 100 pushups by Nov 15?',
    question: 'Mike Torres pledges to complete 100 pushups without stopping',
    outcomes: [
      { name: 'Yes', percent: 67, side: 'yes' },
      { name: 'No', percent: 33, side: 'no' },
    ],
    volume: '1.3k',
    type: 'binary',
    icon: '💪'
  },
  {
    id: '4',
    title: 'Emma deadlift challenge',
    question: 'Will Emma deadlift 225 lbs for 5 reps by October 30?',
    outcomes: [
      { name: 'Yes', percent: 43, side: 'yes' },
      { name: 'No', percent: 57, side: 'no' },
    ],
    volume: '1.6k',
    type: 'binary',
    icon: '🏋️‍♀️'
  },
  {
    id: '5',
    title: 'Who will complete their goal first?',
    question: '5K run under 25 minutes',
    outcomes: [
      { name: 'Jessica Lee', percent: 34, side: 'neutral' },
      { name: 'Tom Wilson', percent: 28, side: 'neutral' },
      { name: 'Chris Park', percent: 22, side: 'neutral' },
      { name: 'Nina Patel', percent: 16, side: 'neutral' },
    ],
    volume: '890',
    type: 'multi',
    icon: '🏃‍♀️'
  },
  {
    id: '6',
    title: 'Will Tom hit his weight goal?',
    question: 'Tom pledges to lose 15 pounds by December 1',
    outcomes: [
      { name: 'Yes', percent: 71, side: 'yes' },
      { name: 'No', percent: 29, side: 'no' },
    ],
    volume: '2.4k',
    type: 'binary',
    icon: '📉'
  },
  {
    id: '7',
    title: 'Will Sarah run 10K under 45min?',
    question: 'Sarah pledges to complete 10K run under 45 minutes by Nov 20',
    outcomes: [
      { name: 'Yes', percent: 35, side: 'yes' },
      { name: 'No', percent: 65, side: 'no' },
    ],
    volume: '1.2k',
    type: 'binary',
    icon: '🏃‍♀️'
  },
  {
    id: '8',
    title: 'Who will bench press 200lbs first?',
    question: 'Strength challenge - who will bench press 200lbs by Dec 15?',
    outcomes: [
      { name: 'Alex Chen', percent: 45, side: 'neutral' },
      { name: 'Mike Torres', percent: 35, side: 'neutral' },
      { name: 'Chris Park', percent: 20, side: 'neutral' },
    ],
    volume: '950',
    type: 'multi',
    icon: '🏋️‍♂️'
  },
]

function App() {
  const [balance] = useState(1000)

  return (
    <div className="min-h-screen bg-polymarket-dark text-polymarket-text font-sans">
      {/* Header - Polymarket Style */}
      <header className="sticky top-0 z-50 bg-polymarket-dark border-b border-polymarket-border">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-polymarket-accent rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white">F</span>
                </div>
                <h1 className="text-xl font-bold text-polymarket-text">FitLock</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-polymarket-text bg-polymarket-card rounded-lg">
                  Browse
                </button>
                <button className="px-4 py-2 text-sm font-medium text-polymarket-text-muted hover:text-polymarket-text">
                  Activity
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-polymarket-card rounded-lg">
                <span className="text-sm text-polymarket-text">£{balance}</span>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-polymarket-text bg-polymarket-accent rounded-lg">
                Sign Up
              </button>
              <button className="w-10 h-10 bg-polymarket-card hover:bg-polymarket-border rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-polymarket-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Filters - Polymarket Style */}
        <div className="mb-6 flex items-center space-x-3 overflow-x-auto pb-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-polymarket-accent rounded-full whitespace-nowrap">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-polymarket-text-muted hover:bg-polymarket-card rounded-full whitespace-nowrap">
            Weight Loss
          </button>
          <button className="px-4 py-2 text-sm font-medium text-polymarket-text-muted hover:bg-polymarket-card rounded-full whitespace-nowrap">
            Running
          </button>
          <button className="px-4 py-2 text-sm font-medium text-polymarket-text-muted hover:bg-polymarket-card rounded-full whitespace-nowrap">
            Strength
          </button>
        </div>

        {/* Pledges Grid - Polymarket Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SAMPLE_PLEDGES.map((pledge) => (
            <div
              key={pledge.id}
              className="bg-polymarket-card rounded-xl border border-polymarket-border hover:border-polymarket-accent transition-all cursor-pointer overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 pb-3 border-b border-polymarket-border">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{pledge.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-polymarket-text leading-tight">
                      {pledge.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Outcomes */}
              <div className="p-4">
                {pledge.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 px-3 mb-2 rounded-lg hover:bg-polymarket-dark transition-colors"
                  >
                    <span className="text-sm font-medium text-polymarket-text">
                      {outcome.name}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className={`text-lg font-bold ${
                        outcome.side === 'yes' ? 'text-polymarket-success' :
                        outcome.side === 'no' ? 'text-polymarket-danger' :
                        'text-polymarket-text'
                      }`}>
                        {outcome.percent}%
                      </span>
                      <div className="flex space-x-1">
                        <button className={`px-3 py-1 text-xs font-medium rounded-full ${
                          outcome.side === 'yes' ? 'bg-polymarket-success text-white' :
                          outcome.side === 'no' ? 'bg-polymarket-danger text-white' :
                          'bg-polymarket-border text-polymarket-text-muted'
                        }`}>
                          {outcome.side === 'yes' ? 'Yes' : outcome.side === 'no' ? 'No' : ''}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Volume and Actions */}
              <div className="px-4 pb-4 pt-2 flex items-center justify-between">
                <span className="text-xs text-polymarket-text-muted">£{pledge.volume} Vol.</span>
                <div className="flex space-x-2">
                  <button className="w-6 h-6 text-polymarket-text-muted hover:text-polymarket-text">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button className="w-6 h-6 text-polymarket-text-muted hover:text-polymarket-text">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-polymarket-card border-t border-polymarket-border md:hidden">
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center text-polymarket-accent space-y-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-polymarket-text-muted hover:text-polymarket-text space-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Browse</span>
          </button>
          <button className="flex flex-col items-center justify-center text-polymarket-text-muted hover:text-polymarket-text space-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-xs">Activity</span>
          </button>
          <button className="flex flex-col items-center justify-center text-polymarket-text-muted hover:text-polymarket-text space-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-xs">More</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App