import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import '@solana/wallet-adapter-react-ui/styles.css';
import { Swap } from "./components/Swap";
import { BlockedPage } from "./components/BlockedPage";
import { DisclaimerModal } from "./components/DisclaimerModal";
import { useEffect, useState } from "react";

function App() {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        // Check if user has already accepted disclaimer
        const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
        
        // Try ipapi.co first
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'US' || data.country === 'United States') {
          setIsBlocked(true);
          setIsLoading(false);
          return;
        }
        
        // User is not from US
        setIsBlocked(false);
        
        // Show disclaimer if not already accepted
        if (!disclaimerAccepted) {
          setShowDisclaimer(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Geolocation check failed:', error);
        // If geolocation fails, show disclaimer to be safe
        const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
        setIsBlocked(false);
        if (!disclaimerAccepted) {
          setShowDisclaimer(true);
        }
        setIsLoading(false);
      }
    };

    checkLocation();
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Checking region...</p>
        </div>
      </div>
    );
  }

  // If user is blocked (from US)
  if (isBlocked) {
    return <BlockedPage />;
  }

  let endpoint = clusterApiUrl('mainnet-beta')

  return <div className="min-h-screen bg-black">
    {showDisclaimer && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}
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