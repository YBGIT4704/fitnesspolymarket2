import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

interface CreatePledgeProps {
  onClose: () => void
}

const CreatePledge = ({ onClose }: CreatePledgeProps) => {
  const [goal, setGoal] = useState('')
  const [stake, setStake] = useState(50)
  const [deadline, setDeadline] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      let imageUrl = null

      // Upload image if provided
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('pledge-images')
          .upload(fileName, image)

        if (uploadError) throw uploadError
        imageUrl = uploadData.path
      }

      // Create pledge
      const { error } = await supabase
        .from('pledges')
        .insert({
          creator_id: user.id,
          goal,
          deadline,
          stake,
          image_url: imageUrl,
          status: 'open',
        })

      if (error) throw error

      // Update user balance (deduct stake)
      const { error: balanceError } = await supabase
        .from('users')
        .update({ gbp_balance: (user.user_metadata?.gbp_balance || 1000) - stake })
        .eq('id', user.id)

      if (balanceError) throw balanceError

      onClose()
    } catch (error) {
      console.error('Error creating pledge:', error)
      alert('Error creating pledge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Create a Pledge</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your fitness goal?
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., I will run 5k under 25 minutes by December 31st"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stake Amount (£)
              </label>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                required
                min="1"
                max={user?.user_metadata?.gbp_balance || 1000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Pledge'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePledge
