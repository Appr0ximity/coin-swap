import { useState } from "react";

interface DisclaimerModalProps {
    onAccept: () => void;
}

export const DisclaimerModal = ({ onAccept }: DisclaimerModalProps) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-8 z-[100]">
            <div className="max-w-2xl w-full bg-[#141417] rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Terms of Use & Disclaimer
                </h2>
                
                <div className="space-y-4 text-gray-300 text-sm sm:text-base mb-6">
                    <p className="font-semibold text-white">
                        Please read and accept the following terms before using this service:
                    </p>
                    
                    <div className="bg-[#1a1a1d] rounded-lg p-4 space-y-3">
                        <p>
                            <span className="text-white font-semibold">1. No US Persons:</span> By using this service, you confirm that you are NOT a U.S. person, U.S. resident, or accessing this service from the United States.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">2. Educational Purpose:</span> This interface is provided for informational and educational purposes only. You understand that you are interacting directly with decentralized protocols.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">3. No Financial Advice:</span> Nothing on this site constitutes financial, investment, legal, or tax advice. Consult with qualified professionals before making any financial decisions.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">4. Use at Your Own Risk:</span> You acknowledge that cryptocurrency transactions are irreversible and involve significant risk. You use this service entirely at your own risk.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">5. No Custody:</span> We do not custody, control, or have access to your funds at any time. All transactions are executed directly on the blockchain through your wallet.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">6. Third-Party Services:</span> This interface aggregates information from third-party protocols. We are not responsible for the operation, security, or availability of these protocols.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">7. Compliance:</span> You are solely responsible for complying with all applicable laws in your jurisdiction, including tax obligations.
                        </p>
                        
                        <p>
                            <span className="text-white font-semibold">8. No Warranty:</span> This service is provided "AS IS" without warranties of any kind, either express or implied.
                        </p>
                    </div>
                    
                    <p className="text-yellow-400 font-semibold">
                        ⚠️ By clicking "I Accept", you acknowledge that you have read, understood, and agree to be bound by these terms.
                    </p>
                </div>
                
                <div className="flex items-start mb-6">
                    <input
                        type="checkbox"
                        id="agree-checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-5 h-5 mt-1 mr-3 accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="agree-checkbox" className="text-white cursor-pointer select-none">
                        I confirm that I am NOT a U.S. person or resident, and I accept all terms and conditions stated above.
                    </label>
                </div>
                
                <button
                    onClick={onAccept}
                    disabled={!agreed}
                    className="w-full rounded-xl font-semibold bg-white text-black text-lg py-4 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {agreed ? "I Accept - Continue to App" : "Please accept the terms above"}
                </button>
            </div>
        </div>
    );
};

