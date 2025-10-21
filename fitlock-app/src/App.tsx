import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { useAuth } from './hooks/useAuth'
import PledgeCard from './components/PledgeCard'
import PledgeDetailModal from './components/PledgeDetailModal'
import CreatePledge from './components/CreatePledge'
import HowItWorks from './components/HowItWorks'
import MyPledges from './components/MyPledges'
import MyBets from './components/MyBets'
import LoadingSpinner from './components/LoadingSpinner'
import type { Pledge } from './types'

type TabType = 'browse' | 'make' | 'my-pledges' | 'my-bets' | 'how-it-works'

function App() {
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('browse')
  const [pledges, setPledges] = useState<Pledge[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null)
  const [showCreatePledge, setShowCreatePledge] = useState(false)

  // Use mock balance if no user (for demo purposes)
  const userBalance = user?.user_metadata?.gbp_balance || 1000

  // Fetch pledges from Supabase
  const fetchPledges = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pledges')
        .select(`
          *,
          creator:users!pledges_creator_id_fkey(*),
          bets(
            *,
            user:users!bets_user_id_fkey(*)
          )
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching pledges:', error)
        // Set empty array on error so app doesn't break
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

  useEffect(() => {
    // Only fetch when auth loading is done
    if (!authLoading) {
      fetchPledges()
    }
  }, [authLoading])

  // Handle placing a bet
  const handlePlaceBet = async (pledgeId: string, side: 'yes' | 'no', amount: number) => {
    if (!user) {
      alert('Please log in to place bets. For now, this is demo mode.')
      return
    }

    try {
      // Insert bet
      const { error: betError } = await supabase
        .from('bets')
        .insert({
          user_id: user.id,
          pledge_id: pledgeId,
          side,
          amount
        })

      if (betError) throw betError

      // Update user balance
      const newBalance = userBalance - amount
      const { error: balanceError } = await supabase
        .from('users')
        .update({ gbp_balance: newBalance })
        .eq('id', user.id)

      if (balanceError) throw balanceError

      // Refresh pledges and close modal
      await fetchPledges()
      setSelectedPledge(null)
      alert('Bet placed successfully!')
    } catch (error) {
      console.error('Error placing bet:', error)
      throw error
    }
  }

  // Handle creating a pledge
  const handleCreatePledge = async (goal: string, deadline: string, stake: number) => {
    if (!user) {
      alert('Please log in to create pledges. For now, this is demo mode.')
      return
    }

    try {
      // Insert pledge
      const { error: pledgeError } = await supabase
        .from('pledges')
        .insert({
          creator_id: user.id,
          goal,
          deadline,
          stake,
          status: 'open'
        })

      if (pledgeError) throw pledgeError

      // Update user balance
      const newBalance = userBalance - stake
      const { error: balanceError } = await supabase
        .from('users')
        .update({ gbp_balance: newBalance })
        .eq('id', user.id)

      if (balanceError) throw balanceError

      // Refresh pledges and close modal
      await fetchPledges()
      setShowCreatePledge(false)
      setActiveTab('browse')
      alert('Pledge created successfully!')
    } catch (error) {
      console.error('Error creating pledge:', error)
      throw error
    }
  }

  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === 'make' || showCreatePledge) {
      return (
        <CreatePledge
          userBalance={userBalance}
          onClose={() => {
            setShowCreatePledge(false)
            setActiveTab('browse')
          }}
          onSubmit={handleCreatePledge}
        />
      )
    }

    if (activeTab === 'how-it-works') {
      return <HowItWorks />
    }

    if (activeTab === 'my-pledges') {
      return <MyPledges />
    }

    if (activeTab === 'my-bets') {
      return <MyBets />
    }

    // Browse tab (default)
    if (loading || authLoading) {
      return <LoadingSpinner />
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pledges.map((pledge) => (
          <PledgeCard
            key={pledge.id}
            pledge={pledge}
            onClick={() => setSelectedPledge(pledge)}
          />
        ))}
        {pledges.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-polymarket-text-muted text-lg mb-4">No pledges yet. Be the first to create one!</p>
            <p className="text-polymarket-text-muted text-sm">
              (Demo mode - You may need to set up Supabase database first)
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-polymarket-dark text-polymarket-text">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-polymarket-dark border-b border-polymarket-border">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-polymarket-accent rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <h1 className="text-xl font-bold text-polymarket-text">FitLock</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-polymarket-card rounded-lg">
                <span className="text-sm text-polymarket-text font-medium">£{userBalance}</span>
              </div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-polymarket-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user.user_metadata?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
              ) : (
                <button className="px-4 py-2 text-sm font-medium text-white bg-polymarket-accent rounded-lg hover:bg-blue-600">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation - 5 Tabs */}
      <nav className="fixed bottom-0 left-0 right-0 bg-polymarket-card border-t border-polymarket-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'browse' ? 'text-polymarket-accent' : 'text-polymarket-text-muted hover:text-polymarket-text'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">Browse</span>
          </button>

          <button
            onClick={() => setActiveTab('my-pledges')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'my-pledges' ? 'text-polymarket-accent' : 'text-polymarket-text-muted hover:text-polymarket-text'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs font-medium">My Pledges</span>
          </button>

          {/* Center Make Pledge Button */}
          <button
            onClick={() => setActiveTab('make')}
            className="relative flex flex-col items-center justify-center"
          >
            <div className={`absolute -top-6 w-14 h-14 rounded-full flex items-center justify-center ${
              activeTab === 'make' ? 'bg-blue-600' : 'bg-polymarket-accent'
            } hover:bg-blue-600 transition-colors shadow-lg`}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className={`text-xs font-medium mt-6 ${
              activeTab === 'make' ? 'text-polymarket-accent' : 'text-polymarket-text-muted'
            }`}>
              Make
            </span>
          </button>

          <button
            onClick={() => setActiveTab('my-bets')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'my-bets' ? 'text-polymarket-accent' : 'text-polymarket-text-muted hover:text-polymarket-text'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-xs font-medium">My Bets</span>
          </button>

          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeTab === 'how-it-works' ? 'text-polymarket-accent' : 'text-polymarket-text-muted hover:text-polymarket-text'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">How It Works</span>
          </button>
        </div>
      </nav>

      {/* Pledge Detail Modal */}
      {selectedPledge && (
        <PledgeDetailModal
          pledge={selectedPledge}
          userBalance={userBalance}
          onClose={() => setSelectedPledge(null)}
          onPlaceBet={handlePlaceBet}
        />
      )}
    </div>
  )
}

export default App
