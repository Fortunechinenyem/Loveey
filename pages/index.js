"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    const uniqueId = uuidv4();
    const uniqueLink = `/valentine/${uniqueId}?name=${encodeURIComponent(
      name
    )}`;
    router.push(uniqueLink);
  };

  const toggleMusic = () => {
    const audio = document.querySelector("audio");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-pink-200 text-white font-great-vibes text-center p-5">
      {showConfetti && <Confetti />}
      <audio autoPlay loop>
        <source src="/valsong.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h1 className="text-4xl mb-8 text-shadow-lg animate-float">
        Create Your Valentine's Message 💌
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter their name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="w-72 p-4 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
        >
          Generate Link
        </button>
      </form>

      <button
        onClick={toggleMusic}
        className="mt-6 p-3 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes hearts {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(45deg);
            opacity: 0;
          }
        }

        .heart {
          position: absolute;
          top: -10%;
          background: #ff6b6b;
          width: 20px;
          height: 20px;
          transform: rotate(45deg);
          animation: hearts 5s infinite;
        }

        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background: #ff6b6b;
          border-radius: 50%;
        }

        .heart::before {
          top: -10px;
          left: 0;
        }

        .heart::after {
          top: 0;
          left: -10px;
        }
      `}</style>

      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-black">
        <p>
          &copy; {new Date().getFullYear()} Loveey. All rights reserved. Created
          by Fortune(Iya in Tech)
        </p>
      </div>
    </div>
  );
}
