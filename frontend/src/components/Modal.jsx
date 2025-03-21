import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Modal = ({
  show,
  onClose,
  title,
  genre,
  description,
  story,
  storyId,
  onDelete,
}) => {
  if (!show) {
    return null;
  }

  const backendUrl =
    import.meta.env.ENV === "local"
      ? "http://localhost:5050"
      : import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/stories/${storyId}`);
      alert("Story deleted successfully!");
      onDelete(storyId);
      onClose();
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete the story. Please try again.");
    }
  };

  const handleReadStory = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(story);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  return (
    <div className="flex inset-0 bg-white bg-opacity-90 justify-center items-center mt-16">
      <div className="bg-white p-8 rounded shadow-lg w-[50vw] h-[80vh] relative">
        {/* Delete Story button in the top-left */}
        <button
          className="absolute top-2 left-2 text-sm text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete Story
        </button>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="overflow-y-auto h-full pt-8 pr-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-xl">{title}</span>
            {/* Read Story Button */}
            <button
              className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
              onClick={handleReadStory}
            >
              <FontAwesomeIcon
                icon={faVolumeUp}
                size="lg"
                className="text-black"
              />
            </button>
          </div>
          <span className="text-lg text-gray-600">{genre}</span>
          <p className="mb-4">{description}</p> {/* Display description */}
          <textarea
            className="w-full h-full max-h-96 p-2 border border-gray-300 rounded resize-none"
            readOnly
            value={story} // Display story
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  genre: PropTypes.string,
  description: PropTypes.string,
  story: PropTypes.string,
  storyId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Modal;
