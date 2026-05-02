'use client'
import React, { useState } from 'react';
import ContentLoader from "./components/ContentLoader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Home() {
  const [error, setError] = useState(null);

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-purple-900 to-purple-500 dark:from-black dark:via-black/90 dark:to-black space-y-10 pt-10 transition-colors duration-500">
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-white">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 flex flex-col items-center max-w-lg w-full text-center shadow-2xl">
              <AlertCircle size={64} className="text-red-500 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold mb-2">Something went wrong!</h2>
              <p className="text-gray-300 mb-8">{error}</p>
              <p className="text-gray-300 mb-8">(network issue ?)</p>
              <button 
                onClick={handleRetry}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <RefreshCcw size={20} />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <ContentLoader mediaCategory={"trending_all_day"} mediaType={"movie"} mediaTitle={'Trending today'} onError={setError} />
            <ContentLoader mediaCategory={"top_grossing"} mediaType={"movie"} mediaTitle={'Top Box office'} onError={setError} />
            <ContentLoader mediaCategory={"top_rated"} mediaType="movie" mediaTitle={'The GOATs'} onError={setError} />
            <ContentLoader mediaCategory={"upcoming"} mediaType="movie" mediaTitle={'Latest Releases'} onError={setError} />
            <ContentLoader mediaCategory={"anime"} mediaType={"movie"} mediaTitle="New in Animations" onError={setError} />
          </>
        )}
      </div>
      <Footer/>
    </>
  );
}
