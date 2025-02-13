"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [selectedMusic, setSelectedMusic] = useState("/valsong.mp3");

  const musicOptions = [
    { name: "Song 1", path: "/valsong.mp3" },
    { name: "Song 2", path: "/song2.mp3" },
    { name: "Song 3", path: "/song3.mp3" },
  ];

  useEffect(() => {
    const valentinesDay = new Date("February 14, 2025 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = valentinesDay - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    const uniqueId = uuidv4();
    const uniqueLink = `/valentine/${uniqueId}?name=${encodeURIComponent(
      name
    )}&sender=${encodeURIComponent(sender)}&message=${encodeURIComponent(
      customMessage
    )}&music=${encodeURIComponent(selectedMusic)}`;

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

  const handleMusicChange = (e) => {
    setSelectedMusic(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-400 text-white font-great-vibes text-center p-5 overflow-hidden`}
    >
      {showConfetti && <Confetti />}
      <audio autoPlay loop key={selectedMusic}>
        <source src={selectedMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h1 className="text-4xl mb-8 font-great-vibes text-shadow-lg animate-float">
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

        <input
          type="text"
          placeholder="Your name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          required
          className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <textarea
          placeholder="Write your heartfelt message..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          required
          className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={4}
        />

        <select
          value={selectedMusic}
          onChange={handleMusicChange}
          className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {musicOptions.map((music, index) => (
            <option key={index} value={music.path}>
              {music.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-72 p-4 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
        >
          Generate Link
        </button>
      </form>

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="mt-6 p-3 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>

      {/* Countdown Timer */}
      <div className="p-4 font-great-vibes">
        <h2 className="text-2xl font-great-vibes font-bold mb-4">
          Countdown to Valentine's Day
        </h2>
        <p className="text-3xl font-great-vibes text-pink-600">{timeLeft}</p>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
        &copy; {new Date().getFullYear()} Loveey. All rights reserved. Created
        with ❤️ by Fortune (Iya in Tech)
      </footer>
    </div>
  );
}
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Confetti from "react-confetti";
// import { v4 as uuidv4 } from "uuid";

// export default function Home() {
//   const [name, setName] = useState("");
//   const router = useRouter();
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [selectedMusic, setSelectedMusic] = useState("/valsong.mp3");

//   const musicOptions = [
//     { name: "Song 1", path: "/valsong.mp3" },
//     { name: "Song 2", path: "/song2.mp3" },
//     { name: "Song 3", path: "/song3.mp3" },
//   ];

//   useEffect(() => {
//     const valentinesDay = new Date("February 14, 2025 00:00:00").getTime();
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const difference = valentinesDay - now;
//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);
//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowConfetti(true);
//     setTimeout(() => setShowConfetti(false), 5000);
//     const uniqueId = uuidv4();
//     const uniqueLink = `/valentine/${uniqueId}?name=${encodeURIComponent(
//       name
//     )}`;
//     router.push(uniqueLink);
//   };

//   const toggleMusic = () => {
//     const audio = document.querySelector("audio");
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleMusicChange = (e) => {
//     setSelectedMusic(e.target.value);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-pink-200 text-white font-great-vibes text-center p-5">
//       {showConfetti && <Confetti />}
//       <audio autoPlay loop key={selectedMusic}>
//         <source src={selectedMusic} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>

//       <h1 className="text-4xl mb-8 font-great-vibes  text-shadow-lg animate-float">
//         Create Your Valentine's Message 💌
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
//       >
//         <input
//           type="text"
//           placeholder="Enter their name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
//         />
//         <select
//           value={selectedMusic}
//           onChange={handleMusicChange}
//           className="w-72 p-4 text-lg border-none rounded-lg bg-white/80 text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
//         >
//           {musicOptions.map((music, index) => (
//             <option key={index} value={music.path}>
//               {music.name}
//             </option>
//           ))}
//         </select>
//         <button
//           type="submit"
//           className="w-72 p-4 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
//         >
//           Generate Link
//         </button>
//       </form>

//       <button
//         onClick={toggleMusic}
//         className="mt-6 p-3 text-lg bg-pink-600 text-white rounded-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md"
//       >
//         {isPlaying ? "Pause Music" : "Play Music"}
//       </button>
//       <div className="p-4 font-great-vibes ">
//         <h2 className="text-2xl font-great-vibes font-bold mb-4">
//           Countdown to Valentine's Day
//         </h2>
//         <p className="text-3xl  font-great-vibes text-pink-600">{timeLeft}</p>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         @keyframes hearts {
//           0% {
//             transform: translateY(0) rotate(45deg);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100vh) rotate(45deg);
//             opacity: 0;
//           }
//         }

//         .heart {
//           position: absolute;
//           top: -10%;
//           background: #ff6b6b;
//           width: 20px;
//           height: 20px;
//           transform: rotate(45deg);
//           animation: hearts 5s infinite;
//         }

//         .heart::before,
//         .heart::after {
//           content: "";
//           position: absolute;
//           width: 20px;
//           height: 20px;
//           background: #ff6b6b;
//           border-radius: 50%;
//         }

//         .heart::before {
//           top: -10px;
//           left: 0;
//         }

//         .heart::after {
//           top: 0;
//           left: -10px;
//         }
//       `}</style>

//       {[...Array(10)].map((_, i) => (
//         <div
//           key={i}
//           className="heart"
//           style={{
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 5}s`,
//           }}
//         />
//       ))}
//       <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
//         &copy; {new Date().getFullYear()} Loveey. All rights reserved. Created
//         with ❤️ by Fortune (Iya in Tech)
//       </footer>
//     </div>
//   );
// }
