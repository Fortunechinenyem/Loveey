import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import VoiceRecorder from "@/app/components/VoiceRecorder";
import PhotoUpload from "@/app/components/PhotoUpload";

export default function Valentine() {
  const router = useRouter();
  const { name } = router.query;
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleMessage, setVisibleMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  const messages = [
    "Every moment with you feels like a dream come true.",
    "Your smile is my favorite thing in the world.",
    "I fall in love with you more every single day.",
    "You are my today and all of my tomorrows.",
    "Being with you is my favorite place to be.",
    "I love you more than words can ever express.",
    "You are the reason I believe in love.",
    "My heart is and always will be yours.",
    "I cherish every second I spend with you.",
    "You are my forever and always.",
    "I dey for you....",
  ];

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isClient) {
      const audio = document.querySelector("audio");
      audio?.play();
    }
  }, [isClient]);

  const handleHeartClick = (message) => {
    setVisibleMessage(message);
  };

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleMusic = () => {
    const audio = document.querySelector("audio");
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen  font-great-vibes flex flex-col items-center justify-center bg-gradient-to-r from-rose-300 via-pink-400 to-red-400 text-white text-center p-5 space-y-8">
      {isClient && (
        <audio autoPlay loop>
          <source src="/valsong.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <h1 className="text-4xl md:text-6xl font-great-vibes mb-4 animate-fade-in drop-shadow-lg">
        Happy Valentine's Day, {name}!
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-2xl md:text-4xl font-semibold text-white drop-shadow-md"
        >
          {messages[currentMessageIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {messages.map((message, index) => (
          <button
            key={index}
            onClick={() => handleHeartClick(message)}
            className="text-4xl hover:scale-125 transition-transform duration-300 drop-shadow-xl"
          >
            ❤️
          </button>
        ))}
      </div>

      {visibleMessage && (
        <p className="text-xl md:text-2xl text-yellow-100 mt-3 font-medium bg-rose-500 p-3 rounded-lg shadow-lg">
          {visibleMessage}
        </p>
      )}

      {/* <div className="flex flex-col md:flex-row gap-4 mt-4 w-full max-w-md">
        <VoiceRecorder />
        <PhotoUpload />
      </div> */}

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleCopyLink}
          className="px-6 py-3 bg-pink-600 rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
        >
          {isCopied ? "Copied!" : "Share this Link"}
        </button>

        <button
          onClick={toggleMusic}
          className="px-6 py-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>

      {isClient && (
        <div className="flex gap-4 mt-4">
          <FacebookShareButton url={window.location.href}>
            <div className="px-4 py-2 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 cursor-pointer transition-transform transform hover:scale-105">
              Share on Facebook
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href}>
            <div className="px-4 py-2 bg-blue-400 rounded-full shadow-md hover:bg-blue-500 cursor-pointer transition-transform transform hover:scale-105">
              Share on Twitter
            </div>
          </TwitterShareButton>
        </div>
      )}

      <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
        &copy; {new Date().getFullYear()} Loveey. All rights reserved. Created
        with ❤️ by Fortune (Iya in Tech)
      </footer>
    </div>
  );
}
