import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-pink-400 opacity-20 blur-[120px] -z-10"></div>

      <div className="text-center max-w-lg p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-100">
        
        {/* Animated 404 & Icon */}
        <div className="flex flex-col items-center justify-center mb-6">
            {/* You can swap this src for any 'confused' or 'error' lordicon you like */}
            <lord-icon
                src="https://cdn.lordicon.com/inrunzby.json"
                trigger="loop"
                delay="2000"
                style={{ width: "120px", height: "120px" }}
            ></lord-icon>
            
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 drop-shadow-sm animate-bounce">
                404
            </h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-lg">
          It looks like you've stumbled into the void. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Go Back Button */}
          <button
            onClick={() => window.history?.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-300 hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Go Back
          </button>

          {/* Home Button */}
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-pink-500 text-white font-semibold shadow-lg hover:bg-pink-600 hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;