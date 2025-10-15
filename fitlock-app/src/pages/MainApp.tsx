import { useState } from 'react'
import PledgeFeed from '../components/PledgeFeed'
import MyPledges from '../components/MyPledges'
import MyBets from '../components/MyBets'
import CreatePledge from '../components/CreatePledge'
import Profile from '../components/Profile'

type Tab = 'feed' | 'my-pledges' | 'my-bets' | 'profile'

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<Tab>('feed')
  const [showCreatePledge, setShowCreatePledge] = useState(false)
  
  // TEMPORARY: Mock user for testing
  const mockUser = {
    id: 'test-user-123',
    email: 'test@example.com',
    user_metadata: {
      name: 'Test User',
      gbp_balance: 1000
    }
  }
  const user = mockUser

  const handleSignOut = async () => {
    console.log('Sign out clicked')
  }

  const renderContent = () => {
    if (showCreatePledge) {
      return <CreatePledge onClose={() => setShowCreatePledge(false)} />
    }

    switch (activeTab) {
      case 'feed':
        return <PledgeFeed />
      case 'my-pledges':
        return <MyPledges />
      case 'my-bets':
        return <MyBets />
      case 'profile':
        return <Profile onSignOut={handleSignOut} />
      default:
        return <PledgeFeed />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">FitLock</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">£{user?.user_metadata?.gbp_balance || 1000}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center h-16">
            {/* Feed Tab */}
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md ${
                activeTab === 'feed' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="text-xs">Feed</span>
            </button>

            {/* Create Pledge Button */}
            <button
              onClick={() => setShowCreatePledge(true)}
              className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* My Pledges Tab */}
            <button
              onClick={() => setActiveTab('my-pledges')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md ${
                activeTab === 'my-pledges' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">My Pledges</span>
            </button>

            {/* My Bets Tab */}
            <button
              onClick={() => setActiveTab('my-bets')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md ${
                activeTab === 'my-bets' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="text-xs">My Bets</span>
            </button>

            {/* Profile Tab */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md ${
                activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MainApp
