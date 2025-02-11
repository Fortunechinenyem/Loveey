import { useState } from "react";

const themes = [
  { name: "Romantic", background: "bg-pink-100", textColor: "text-pink-800" },
  { name: "Funny", background: "bg-yellow-100", textColor: "text-yellow-800" },
  { name: "Vintage", background: "bg-gray-100", textColor: "text-gray-800" },
  { name: "Minimalist", background: "bg-white", textColor: "text-black" },
];

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Choose a Theme</h2>
      <div className="flex gap-4">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setSelectedTheme(theme)}
            className={`p-4 rounded-lg ${theme.background} ${theme.textColor} border-2 border-transparent hover:border-pink-500`}
          >
            {theme.name}
          </button>
        ))}
      </div>
      <div className={`mt-8 p-8 rounded-lg ${selectedTheme.background}`}>
        <h3 className={`text-3xl font-bold ${selectedTheme.textColor}`}>
          Happy Valentine's Day!
        </h3>
      </div>
    </div>
  );
}
