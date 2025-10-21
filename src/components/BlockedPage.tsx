export const BlockedPage = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-[#141417] rounded-2xl p-8 sm:p-12 text-center">
                <div className="mb-6">
                    <svg className="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Service Not Available
                </h1>
                
                <p className="text-lg text-gray-300 mb-6">
                    We're sorry, but this service is not available in the United States.
                </p>
                
                <div className="bg-[#1a1a1d] rounded-lg p-6 text-left mb-6">
                    <h2 className="text-xl font-semibold text-white mb-3">Why am I seeing this?</h2>
                    <p className="text-gray-400 mb-4">
                        Due to regulatory requirements and compliance considerations, we cannot provide cryptocurrency swap services to users located in the United States.
                    </p>
                    <p className="text-gray-400">
                        This restriction is based on your detected IP address location.
                    </p>
                </div>
                
                <div className="text-sm text-gray-500">
                    <p>If you believe this is an error, please check your VPN or proxy settings.</p>
                </div>
            </div>
        </div>
    );
};

