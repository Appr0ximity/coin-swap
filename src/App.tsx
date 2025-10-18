import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import '@solana/wallet-adapter-react-ui/styles.css';
import { Swap } from "./components/Swap";

function App() {

  let endpoint = clusterApiUrl('devnet')

  return <div className="min-h-screen bg-black">
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div className='sticky top-0 z-50 w-full py-3 bg-black/95 backdrop-blur'>
            <div className='max-w-7xl mx-auto flex h-16 items-center justify-between px-8'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <h1 className='text-4xl font-semibold text-white' style={{textShadow: '0 0 20px rgba(56, 189, 248, 0.3)'}}>
                    Coin Swap
                  </h1>
                  <p className='text-xs text-gray-400 mt-1 ml-3'>Decentralized coin swap for Solana Network</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>
          </div>
          <Swap></Swap>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>
}

export default App