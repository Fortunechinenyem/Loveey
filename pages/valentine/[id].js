import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FacebookShareButton, TwitterShareButton } from "react-share";

// Personalized and intimate messages
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
];

export default function Valentine() {
  const router = useRouter();
  const { name } = router.query;
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Automatically cycle through messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Copy the link to the clipboard
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const link = window.location.href;
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy link:", err);
        });
    }
  };

  // Toggle music
  const toggleMusic = () => {
    if (typeof window !== "undefined") {
      const audio = document.querySelector("audio");
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-pink-200 text-white font-great-vibes text-center p-5">
      {/* Background Music */}
      {typeof window !== "undefined" && (
        <audio autoPlay loop>
          <source src="/valsong.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Title */}
      <h1 className="text-6xl mb-8 text-shadow-lg animate-float">
        Happy Valentine's Day, {name}! 💖
      </h1>

      {/* Slideshow of Messages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-3xl font-bold text-pink-700"
        >
          {messages[currentMessageIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Message Counter */}
      <div className="mt-4 text-lg text-pink-800">
        {currentMessageIndex + 1} of {messages.length}
      </div>

      {/* Share Button */}
      <button
        onClick={handleCopyLink}
        className="mt-8 px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
      >
        {isCopied ? "Copied!" : "Share this Link"}
      </button>

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>

      {/* Social Media Sharing Buttons */}
      <div className="mt-4 flex gap-4">
        <FacebookShareButton
          url={typeof window !== "undefined" ? window.location.href : ""}
        >
          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors cursor-pointer">
            Share on Facebook
          </div>
        </FacebookShareButton>
        <TwitterShareButton
          url={typeof window !== "undefined" ? window.location.href : ""}
        >
          <div className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors cursor-pointer">
            Share on Twitter
          </div>
        </TwitterShareButton>
      </div>
    </div>
  );
}
