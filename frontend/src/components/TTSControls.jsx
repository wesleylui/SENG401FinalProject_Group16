import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faPause } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

const TTSControls = ({ story }) => {
  const ttsRef = useRef(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        // Default to the 8th voice if available, otherwise the first voice
        setSelectedVoice(availableVoices[7]?.name || availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsTtsPlaying(false);
    };
  }, [story]);

  const handlePlayPause = () => {
    if ("speechSynthesis" in window) {
      if (isTtsPlaying) {
        window.speechSynthesis.cancel();
        setIsTtsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(story);
        utterance.lang = "en-US";

        const voice = voices.find((voice) => voice.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => setIsTtsPlaying(false);
        ttsRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsTtsPlaying(true);
      }
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
        className="p-2 border border-gray-300 rounded bg-white text-black"
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={handlePlayPause}
      >
        <FontAwesomeIcon
          icon={isTtsPlaying ? faPause : faVolumeUp}
          size="lg"
          className="text-black"
        />
      </button>
    </div>
  );
};

TTSControls.propTypes = {
  story: PropTypes.string.isRequired,
};

export default TTSControls;
