import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import '@solana/wallet-adapter-react-ui/styles.css';
import { Swap } from "./components/Swap";

function App() {

  let endpoint = clusterApiUrl('mainnet-beta')

  return <div className="min-h-screen bg-black">
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div className='sticky top-0 z-50 w-full py-2 sm:py-3 bg-black/95 backdrop-blur'>
            <div className='max-w-7xl mx-auto flex flex-col sm:flex-row sm:h-16 items-center justify-between px-4 sm:px-8 gap-3 sm:gap-0'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col'>
                  <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center sm:text-left' style={{textShadow: '0 0 20px rgba(56, 189, 248, 0.3)'}}>
                    Coin Swap
                  </h1>
                  <p className='text-[10px] sm:text-xs text-gray-400 mt-1 sm:ml-3 text-center sm:text-left hidden sm:block'>Decentralized coin swap for Solana Network</p>
                </div>
              </div>
              <div className='flex gap-2 sm:gap-3 w-full sm:w-auto justify-center'>
                <WalletMultiButton className="!text-sm !py-2 !px-4" />
                <WalletDisconnectButton className="!text-sm !py-2 !px-4" />
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