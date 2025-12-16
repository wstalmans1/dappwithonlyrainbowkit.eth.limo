import { useState } from 'react'
import { useStorachaStore } from '../stores'

/**
 * Example component demonstrating Zustand store usage for Storacha account and space management
 * This is a scaffold - implement actual Storacha SDK integration in your learning path
 */
export default function StorachaManager() {
  const {
    // State
    currentAccount,
    isAuthenticated,
    accounts,
    spaces,
    selectedSpace,
    spaceContents,
    isLoading,
    isLoadingSpaces,
    isLoadingContents,
    error,
    // Actions
    login,
    logout,
    switchAccount,
    addAccount,
    removeAccount,
    fetchSpaces,
    createSpace,
    deleteSpace,
    selectSpace,
    uploadToSpace,
    deleteFromSpace,
    clearError,
  } = useStorachaStore()

  const [email, setEmail] = useState('')
  const [newSpaceName, setNewSpaceName] = useState('')

  const handleLogin = async () => {
    if (!email) return
    try {
      await login(email)
      await fetchSpaces()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleLogout = () => {
    logout()
    setEmail('')
  }

  const handleSwitchAccount = async (accountId: string) => {
    await switchAccount(accountId)
  }

  const handleCreateSpace = async () => {
    if (!newSpaceName) return
    try {
      await createSpace(newSpaceName)
      setNewSpaceName('')
    } catch (err) {
      console.error('Failed to create space:', err)
    }
  }

  const handleDeleteSpace = async (spaceId: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return
    try {
      await deleteSpace(spaceId)
    } catch (err) {
      console.error('Failed to delete space:', err)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedSpace) return
    try {
      await uploadToSpace(selectedSpace.id, file)
    } catch (err) {
      console.error('Failed to upload file:', err)
    }
  }

  const handleDeleteContent = async (contentId: string) => {
    if (!selectedSpace) return
    if (!confirm('Are you sure you want to delete this content?')) return
    try {
      await deleteFromSpace(selectedSpace.id, contentId)
    } catch (err) {
      console.error('Failed to delete content:', err)
    }
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur">
      <h2 className="text-xl font-semibold mb-4">Storacha Account Manager</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-xs text-red-400 hover:text-red-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Authentication Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Authentication</h3>
        {!isAuthenticated ? (
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Storacha email"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400"
            />
            <button
              onClick={handleLogin}
              disabled={isLoading || !email}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-400">
              Logged in as: <span className="text-white">{currentAccount?.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Multiple Accounts Section */}
      {accounts.length > 1 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Switch Account</h3>
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSwitchAccount(account.id)}
                className={`w-full px-3 py-2 text-left rounded-lg border ${
                  currentAccount?.id === account.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                {account.email}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spaces Section */}
      {isAuthenticated && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Spaces</h3>
          <div className="space-y-2 mb-3">
            <input
              type="text"
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              placeholder="New space name"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400"
            />
            <button
              onClick={handleCreateSpace}
              disabled={isLoadingSpaces || !newSpaceName}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg"
            >
              Create Space
            </button>
          </div>
          {isLoadingSpaces ? (
            <p className="text-slate-400 text-sm">Loading spaces...</p>
          ) : spaces.length === 0 ? (
            <p className="text-slate-400 text-sm">No spaces yet. Create one above!</p>
          ) : (
            <div className="space-y-2">
              {spaces.map((space) => (
                <div
                  key={space.id}
                  className={`p-3 rounded-lg border ${
                    selectedSpace?.id === space.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => selectSpace(space)}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium">{space.name}</p>
                    </button>
                    <button
                      onClick={() => handleDeleteSpace(space.id)}
                      className="ml-2 px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Space Contents Section */}
      {isAuthenticated && selectedSpace && (
        <div>
          <h3 className="text-lg font-medium mb-3">
            Contents: {selectedSpace.name}
          </h3>
          <div className="mb-3">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={isLoadingContents}
              className="text-sm text-slate-400"
            />
          </div>
          {isLoadingContents ? (
            <p className="text-slate-400 text-sm">Loading contents...</p>
          ) : (
            <div className="space-y-2">
              {spaceContents[selectedSpace.id]?.length === 0 ? (
                <p className="text-slate-400 text-sm">No contents yet. Upload a file above!</p>
              ) : (
                spaceContents[selectedSpace.id]?.map((content) => (
                  <div
                    key={content.id}
                    className="p-3 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{content.name}</p>
                      {content.size && (
                        <p className="text-xs text-slate-400">
                          {(content.size / 1024).toFixed(2)} KB
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteContent(content.id)}
                      className="ml-2 px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
