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
  const [selectedMusic] = useState(music || "/valsong.mp3");
  const [copied, setCopied] = useState(false);

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
      <audio autoPlay loop>
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
        className="bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-sm text-center max-w-lg"
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

      <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
        &copy; {new Date().getFullYear()} Loveey. Created with ❤️ by Fortune
      </footer>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { motion, AnimatePresence } from "framer-motion";
// import { FacebookShareButton, TwitterShareButton } from "react-share";
// import { FaHeart, FaPause, FaPlay } from "react-icons/fa";

// export default function Valentine() {
//   const router = useRouter();
//   const { name, sender, message, music } = router.query;

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [selectedMusic] = useState(music || "/valsong.mp3");

//   const messages = [
//     "Every moment with you feels like a dream come true.",
//     "Your smile is my favorite thing in the world.",
//     "I fall in love with you more every single day.",
//     "You are my today and all of my tomorrows.",
//     "Being with you is my favorite place to be.",
//     "I love you more than words can ever express.",
//     "You are the reason I believe in love.",
//     "My heart is and always will be yours.",
//     "I cherish every second I spend with you.",
//     "You are my forever and always.",
//     "I dey for you....",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const toggleMusic = () => {
//     const audio = document.querySelector("audio");
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-400 text-white font-great-vibes text-center p-5 overflow-hidden">
//       <audio autoPlay loop>
//         <source src={selectedMusic} type="audio/mpeg" />
//       </audio>

//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-red-300 text-opacity-50"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               fontSize: `${Math.random() * 30 + 10}px`,
//             }}
//             animate={{ y: [0, -50], opacity: [1, 0] }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           >
//             <FaHeart />
//           </motion.div>
//         ))}
//       </div>

//       <motion.div
//         className="bg-white/20 p-6 rounded-xl shadow-lg backdrop-blur-sm text-center max-w-lg"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-4xl font-bold font-great-vibes text-shadow-lg">
//           {name} ❤️
//         </h1>
//         <p className="text-lg mt-4 font-great-vibes text-white/90">{message}</p>
//         {sender && (
//           <p className="mt-4 text-lg font-great-vibes italic">
//             With Love, {sender} 💖
//           </p>
//         )}
//       </motion.div>

//       <AnimatePresence mode="wait">
//         <motion.p
//           key={currentMessageIndex}
//           className="text-xl mt-6 font-great-vibes text-white/80"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.8 }}
//         >
//           {messages[currentMessageIndex]}
//         </motion.p>
//       </AnimatePresence>

//       <button
//         onClick={toggleMusic}
//         className="mt-6 p-3 text-lg bg-white/30 text-white rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center w-14 h-14"
//       >
//         {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
//       </button>

//       <div className="mt-6 flex gap-4">
//         <FacebookShareButton
//           url={typeof window !== "undefined" ? window.location.href : "#"}
//         >
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//             Share on Facebook
//           </button>
//         </FacebookShareButton>
//         <TwitterShareButton
//           url={typeof window !== "undefined" ? window.location.href : "#"}
//         >
//           <button className="bg-blue-400 text-white px-4 py-2 rounded-lg">
//             Share on Twitter
//           </button>
//         </TwitterShareButton>
//       </div>

//       <footer className="border-t border-gray-300 mt-8 pt-4 text-sm text-white/90">
//         &copy; {new Date().getFullYear()} Loveey. Created with ❤️ by Fortune
//       </footer>
//     </div>
//   );
// }
