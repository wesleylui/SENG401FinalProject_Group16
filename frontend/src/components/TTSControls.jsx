import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faPause } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

const TTSControls = ({ story }) => {
  const ttsRef = useRef(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
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

        const selectedVoice = voices.find((voice) =>
          voice.name.toLowerCase().includes("female")
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
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
    <div>
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
