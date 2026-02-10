import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-indigo-500/10" aria-hidden />
      <div className="relative flex w-full flex-col gap-10 px-6 py-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Starter v27.2</p>
            <h1 className="text-2xl font-semibold text-white">DAO DApp</h1>
          </div>
          <ConnectButton />
        </header>

        <section className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-white/5 px-8 py-8 backdrop-blur">
          <h2 className="mb-3 text-lg font-semibold text-white">What is this?</h2>
          <p className="mb-4 leading-relaxed text-slate-300">
            A minimal Web3 DApp served entirely from{' '}
            <a
              href="https://dappwithonlyrainbowkit.eth.limo"
              className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-2 transition hover:text-cyan-300 hover:decoration-cyan-300/50"
            >
              ENS&nbsp;+&nbsp;IPFS
            </a>.
            Right now its only purpose is to test wallet connectivity — hit the
            <strong className="text-white"> Connect Wallet </strong>
            button above to verify that the DApp can talk to the blockchain
            through RainbowKit&nbsp;+&nbsp;wagmi.
          </p>
          <p className="mb-5 text-sm leading-relaxed text-slate-400">
            Everything else is scaffolded and ready to build on, but not yet
            wired up as live features. Source code on{' '}
            <a
              href="https://github.com/wstalmans1/dappwithonlyrainbowkit.eth.limo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 underline decoration-slate-500/40 underline-offset-2 transition hover:text-white hover:decoration-slate-300/50"
            >
              GitHub
            </a>.
          </p>

          <details className="group text-sm text-slate-500">
            <summary className="cursor-pointer select-none text-slate-400 transition hover:text-slate-300">
              Scaffolded stack details
            </summary>
            <ul className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-400/60">&#9670;</span>
                <span><strong className="text-slate-400">Wallet</strong> — RainbowKit&nbsp;+&nbsp;wagmi&nbsp;v2 for multi-chain connectivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-400/60">&#9670;</span>
                <span><strong className="text-slate-400">Storage</strong> — Storacha / Pinata / Fleek for IPFS pinning &amp; IPNS publishing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-400/60">&#9670;</span>
                <span><strong className="text-slate-400">Contracts</strong> — Hardhat&nbsp;+&nbsp;Foundry with OpenZeppelin, deploy scripts &amp; verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-400/60">&#9670;</span>
                <span><strong className="text-slate-400">Frontend</strong> — Vite&nbsp;+&nbsp;React&nbsp;18&nbsp;+&nbsp;Tailwind&nbsp;v4, decentralized hosting on IPFS</span>
              </li>
            </ul>
          </details>
        </section>
      </div>
    </div>
  )
}
