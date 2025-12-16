// Storacha account and space type definitions
// These types match the @storacha/client SDK structure

export interface StorachaAccount {
  id: string
  email: string
  // Add other account properties as needed based on @storacha/client SDK
}

export interface StorachaSpace {
  id: string
  name: string
  // Add other space properties as needed based on @storacha/client SDK
}

export interface StorachaContent {
  id: string
  name: string
  cid?: string
  size?: number
  type?: string
  // Add other content properties as needed based on @storacha/client SDK
}
