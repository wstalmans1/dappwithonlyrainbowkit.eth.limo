// IPFS provider configuration and selection
// Supports multiple pinning providers:
// - Storacha (via @storacha/client)
//   Usage: import { create } from "@storacha/client"
//   const client = await create()
//   const account = await client.login(email) // Email entered by user at runtime
//   await account.plan.wait() // Wait for payment plan selection
//   const space = await client.createSpace("my-space", { account })
//   const cid = await client.uploadFile(file)
// - Pinata (via pinata SDK v2.5.1 - VITE_PINATA_JWT, VITE_PINATA_GATEWAY)
//   Usage: import { PinataSDK } from "pinata"
//   const pinata = new PinataSDK({ pinataJwt, pinataGateway })
//   Pin existing CID: await pinata.upload.public.cid(cid)
//   Check pin status: await pinata.files.public.list().cid(cid)
// - Fleek Platform (via @fleek-platform/sdk/browser - VITE_FLEEK_CLIENT_ID)
//   Uses ApplicationAccessTokenService for client-side authentication
// Users can configure which provider(s) to use via environment variables
// Will be implemented in learning path
