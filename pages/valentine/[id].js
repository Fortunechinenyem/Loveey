"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaHeart, FaPause, FaPlay, FaCopy, FaCheck } from "react-icons/fa";

export default function Valentine() {
  const router = useRouter();
  const { name, sender, message, music } = router.query;

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedMusic, setSelectedMusic] = useState("/valsong.mp3");
  const [copied, setCopied] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle review form

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
    if (music) {
      setSelectedMusic(music);
    }
  }, [music]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    const audio = document.querySelector("audio");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "Generating link...";

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-400 text-white font-great-vibes text-center p-5 overflow-hidden">
      <audio autoPlay loop key={selectedMusic}>
        <source src={selectedMusic} type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-300 text-opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 10}px`,
            }}
            animate={{ y: [0, -50], opacity: [1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold font-great-vibes text-shadow-lg">
          {name} ❤️
        </h1>
        <p className="text-lg mt-4 font-great-vibes text-white/90">{message}</p>
        {sender && (
          <p className="mt-4 text-lg font-great-vibes italic">
            With Love, {sender} 💖
          </p>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          className="text-xl mt-6 font-great-vibes text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={toggleMusic}
        className="mt-6 p-3 text-lg bg-white/30 text-white rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center w-14 h-14"
      >
        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
      </button>

      <div className="mt-6 bg-white/30 p-3 rounded-lg flex items-center justify-between w-full max-w-md">
        <p className="text-sm truncate">{pageUrl}</p>
        <button
          onClick={copyToClipboard}
          className="ml-3 bg-white text-red-500 p-2 rounded-full"
        >
          {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
        </button>
      </div>

      <div className="mt-6 flex gap-4">
        <FacebookShareButton url={pageUrl} className="flex">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
            Share on Facebook
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={pageUrl} className="flex">
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg cursor-pointer">
            Share on Twitter
          </div>
        </TwitterShareButton>
        <WhatsappShareButton url={pageUrl} className="flex">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
            Share on WhatsApp
          </div>
        </WhatsappShareButton>
      </div>

      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        className="mt-6 p-3 text-lg bg-white/30 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
      >
        {showReviewForm ? "Close Review Form" : "Leave a Review"}
      </button>

      {showReviewForm && (
        <motion.div
          className="mt-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ReviewForm />
        </motion.div>
      )}

      <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
        &copy; {new Date().getFullYear()} Loveey. All rights reserved. Created
        with ❤️ by Fortune (Iya in Tech) |
        <a
          href="tel:+2348067585444"
          className="text-white font-great-vibes ml-2"
        >
          📞 Call me
        </a>
      </footer>
    </div>
  );
}

function ReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: review }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for your review!");
        setName("");
        setEmail("");
        setReview("");
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        className="w-full p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        rows={4}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-4 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      {message && (
        <p className="mt-4 text-lg text-pink-600 font-semibold">{message}</p>
      )}
    </form>
  );
}
