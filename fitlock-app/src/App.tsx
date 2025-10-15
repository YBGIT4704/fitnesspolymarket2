import { useState } from 'react'

// Mock data - matching actual Polymarket structure
const SAMPLE_PLEDGES = [
  {
    id: '1',
    title: 'Will Alex complete marathon training?',
    question: 'Alex Chen pledges to run a half marathon under 2 hours by December 31',
    outcomes: [
      { name: 'Alex Chen', percent: 58, side: 'yes' },
    ],
    volume: '2.1k',
    type: 'single'
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
    type: 'multi'
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
    type: 'binary'
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
    type: 'binary'
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
    type: 'multi'
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
    type: 'binary'
  },
]

function App() {
  const [balance] = useState(1000)

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact Polymarket style */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-sm font-bold text-white">F</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">FitLock</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
                  Browse
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                  Activity
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-md">
                <span className="text-sm text-gray-600">£{balance}</span>
              </div>
              <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Filters - Polymarket style */}
        <div className="mb-6 flex items-center space-x-3 overflow-x-auto pb-2">
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md whitespace-nowrap">
            All
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap">
            Weight Loss
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap">
            Running
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap">
            Strength
          </button>
        </div>

        {/* Pledges Grid - Exact Polymarket card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SAMPLE_PLEDGES.map((pledge) => (
            <div
              key={pledge.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 pb-3 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 leading-snug">
                  {pledge.title}
                </h3>
              </div>

              {/* Outcomes */}
              <div className="p-3">
                {pledge.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2.5 px-3 mb-1.5 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {outcome.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        outcome.side === 'yes' ? 'text-green-600' :
                        outcome.side === 'no' ? 'text-red-600' :
                        'text-gray-900'
                      }`}>
                        {outcome.percent}%
                      </span>
                      <div className="flex space-x-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          outcome.side === 'yes' ? 'bg-green-50 text-green-700' :
                          outcome.side === 'no' ? 'bg-red-50 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {outcome.side === 'yes' ? 'Yes' : outcome.side === 'no' ? 'No' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Volume */}
              <div className="px-4 pb-3 pt-1">
                <span className="text-xs text-gray-500">£{pledge.volume} Vol.</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-4 h-16">
          <button className="flex flex-col items-center justify-center text-blue-600 space-y-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 space-y-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Browse</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 space-y-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-xs">Activity</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 space-y-0.5">
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