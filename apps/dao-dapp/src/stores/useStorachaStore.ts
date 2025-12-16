import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StorachaAccount, StorachaSpace, StorachaContent } from '../types/storacha'

interface StorachaStore {
  // Authentication state
  currentAccount: StorachaAccount | null
  isAuthenticated: boolean
  accounts: StorachaAccount[] // Multiple accounts user can switch between
  isLoading: boolean
  error: string | null

  // Spaces state
  spaces: StorachaSpace[]
  selectedSpace: StorachaSpace | null
  isLoadingSpaces: boolean

  // Space contents state
  spaceContents: Record<string, StorachaContent[]> // spaceId -> contents
  isLoadingContents: boolean

  // Authentication actions
  login: (email: string) => Promise<void>
  logout: () => void
  switchAccount: (accountId: string) => Promise<void>
  addAccount: (account: StorachaAccount) => void
  removeAccount: (accountId: string) => void

  // Spaces actions
  fetchSpaces: () => Promise<void>
  createSpace: (name: string) => Promise<void>
  deleteSpace: (spaceId: string) => Promise<void>
  selectSpace: (space: StorachaSpace | null) => void

  // Space contents actions
  fetchSpaceContents: (spaceId: string) => Promise<void>
  uploadToSpace: (spaceId: string, file: File) => Promise<void>
  deleteFromSpace: (spaceId: string, contentId: string) => Promise<void>

  // Utility actions
  clearError: () => void
  reset: () => void
}

const initialState = {
  currentAccount: null,
  isAuthenticated: false,
  accounts: [],
  isLoading: false,
  error: null,
  spaces: [],
  selectedSpace: null,
  isLoadingSpaces: false,
  spaceContents: {},
  isLoadingContents: false,
}

export const useStorachaStore = create<StorachaStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Authentication actions
      login: async (email: string) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Implement actual Storacha login
          // import { create } from '@storacha/client'
          // const client = await create()
          // const account = await client.login(email)
          
          // For now, create a mock account
          const account: StorachaAccount = {
            id: `account-${Date.now()}`,
            email,
          }

          set((state) => ({
            currentAccount: account,
            isAuthenticated: true,
            accounts: state.accounts.some((a) => a.id === account.id)
              ? state.accounts
              : [...state.accounts, account],
            isLoading: false,
            error: null,
          }))
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          })
          throw error
        }
      },

      logout: () => {
        set({
          currentAccount: null,
          isAuthenticated: false,
          selectedSpace: null,
          spaces: [],
          spaceContents: {},
        })
      },

      switchAccount: async (accountId: string) => {
        const account = get().accounts.find((a) => a.id === accountId)
        if (!account) {
          set({ error: 'Account not found' })
          return
        }

        set({
          currentAccount: account,
          isAuthenticated: true,
          selectedSpace: null,
          spaces: [],
          spaceContents: {},
        })

        // Automatically fetch spaces for the new account
        await get().fetchSpaces()
      },

      addAccount: (account: StorachaAccount) => {
        set((state) => ({
          accounts: state.accounts.some((a) => a.id === account.id)
            ? state.accounts
            : [...state.accounts, account],
        }))
      },

      removeAccount: (accountId: string) => {
        set((state) => {
          const newAccounts = state.accounts.filter((a) => a.id !== accountId)
          const isCurrentAccount = state.currentAccount?.id === accountId
          return {
            accounts: newAccounts,
            currentAccount: isCurrentAccount ? null : state.currentAccount,
            isAuthenticated: isCurrentAccount ? false : state.isAuthenticated,
            selectedSpace: isCurrentAccount ? null : state.selectedSpace,
            spaces: isCurrentAccount ? [] : state.spaces,
            spaceContents: isCurrentAccount ? {} : state.spaceContents,
          }
        })
      },

      // Spaces actions
      fetchSpaces: async () => {
        const { currentAccount } = get()
        if (!currentAccount) {
          set({ error: 'No account selected' })
          return
        }

        set({ isLoadingSpaces: true, error: null })
        try {
          // TODO: Implement actual Storacha spaces fetching
          // const client = await create()
          // const account = await client.login(currentAccount.email)
          // const spaces = await account.listSpaces()
          
          // For now, return empty array
          const spaces: StorachaSpace[] = []

          set({ spaces, isLoadingSpaces: false })
        } catch (error) {
          set({
            isLoadingSpaces: false,
            error: error instanceof Error ? error.message : 'Failed to fetch spaces',
          })
        }
      },

      createSpace: async (name: string) => {
        const { currentAccount } = get()
        if (!currentAccount) {
          set({ error: 'No account selected' })
          return
        }

        set({ isLoadingSpaces: true, error: null })
        try {
          // TODO: Implement actual Storacha space creation
          // const client = await create()
          // const account = await client.login(currentAccount.email)
          // const space = await client.createSpace(name, { account })
          
          // For now, create a mock space
          const newSpace: StorachaSpace = {
            id: `space-${Date.now()}`,
            name,
          }

          set((state) => ({
            spaces: [...state.spaces, newSpace],
            isLoadingSpaces: false,
          }))
        } catch (error) {
          set({
            isLoadingSpaces: false,
            error: error instanceof Error ? error.message : 'Failed to create space',
          })
          throw error
        }
      },

      deleteSpace: async (spaceId: string) => {
        set({ isLoadingSpaces: true, error: null })
        try {
          // TODO: Implement actual Storacha space deletion
          // const client = await create()
          // const account = await client.login(get().currentAccount!.email)
          // await account.deleteSpace(spaceId)

          set((state) => {
            const newSpaces = state.spaces.filter((s) => s.id !== spaceId)
            const newContents = { ...state.spaceContents }
            delete newContents[spaceId]
            return {
              spaces: newSpaces,
              selectedSpace: state.selectedSpace?.id === spaceId ? null : state.selectedSpace,
              spaceContents: newContents,
              isLoadingSpaces: false,
            }
          })
        } catch (error) {
          set({
            isLoadingSpaces: false,
            error: error instanceof Error ? error.message : 'Failed to delete space',
          })
          throw error
        }
      },

      selectSpace: (space: StorachaSpace | null) => {
        set({ selectedSpace: space })
        if (space) {
          // Automatically fetch contents when space is selected
          get().fetchSpaceContents(space.id)
        }
      },

      // Space contents actions
      fetchSpaceContents: async (spaceId: string) => {
        set({ isLoadingContents: true, error: null })
        try {
          // TODO: Implement actual Storacha contents fetching
          // const client = await create()
          // const account = await client.login(get().currentAccount!.email)
          // const contents = await account.listSpaceContents(spaceId)
          
          // For now, return empty array
          const contents: StorachaContent[] = []

          set((state) => ({
            spaceContents: {
              ...state.spaceContents,
              [spaceId]: contents,
            },
            isLoadingContents: false,
          }))
        } catch (error) {
          set({
            isLoadingContents: false,
            error: error instanceof Error ? error.message : 'Failed to fetch space contents',
          })
        }
      },

      uploadToSpace: async (spaceId: string, file: File) => {
        set({ isLoadingContents: true, error: null })
        try {
          // TODO: Implement actual Storacha file upload
          // const client = await create()
          // const account = await client.login(get().currentAccount!.email)
          // const cid = await client.uploadFile(file, { spaceId })
          
          // For now, create a mock content
          const newContent: StorachaContent = {
            id: `content-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
          }

          set((state) => ({
            spaceContents: {
              ...state.spaceContents,
              [spaceId]: [...(state.spaceContents[spaceId] || []), newContent],
            },
            isLoadingContents: false,
          }))
        } catch (error) {
          set({
            isLoadingContents: false,
            error: error instanceof Error ? error.message : 'Failed to upload file',
          })
          throw error
        }
      },

      deleteFromSpace: async (spaceId: string, contentId: string) => {
        set({ isLoadingContents: true, error: null })
        try {
          // TODO: Implement actual Storacha content deletion
          // const client = await create()
          // const account = await client.login(get().currentAccount!.email)
          // await account.deleteContent(spaceId, contentId)

          set((state) => ({
            spaceContents: {
              ...state.spaceContents,
              [spaceId]: (state.spaceContents[spaceId] || []).filter(
                (c) => c.id !== contentId
              ),
            },
            isLoadingContents: false,
          }))
        } catch (error) {
          set({
            isLoadingContents: false,
            error: error instanceof Error ? error.message : 'Failed to delete content',
          })
          throw error
        }
      },

      // Utility actions
      clearError: () => {
        set({ error: null })
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'storacha-storage', // localStorage key
      partialize: (state) => ({
        // Only persist authentication state, not loading/error states
        currentAccount: state.currentAccount,
        isAuthenticated: state.isAuthenticated,
        accounts: state.accounts,
        selectedSpace: state.selectedSpace,
      }),
    }
  )
)
