import { useState } from "react";

export default function PhotoUpload() {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  return (
    <div className="p-4 font-great-vibes ">
      <h2 className="text-2xl font-great-vibes  font-bold mb-4">
        Upload Photos
      </h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoUpload}
        className="mb-4"
      />
      <div className="flex gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={`Photo ${index + 1}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
