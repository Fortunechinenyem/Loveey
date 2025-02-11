import { useState } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
    };

    mediaRecorder.start();
    setIsRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setIsRecording(false);
    }, 5000); // Record for 5 seconds
  };

  return (
    <div className="p-4 font-great-vibes ">
      <h2 className="text-2xl  font-great-vibes font-bold mb-4">
        Record a Voice Message
      </h2>
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg"
      >
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      {audioURL && <audio controls src={audioURL} className="mt-4" />}
    </div>
  );
}
