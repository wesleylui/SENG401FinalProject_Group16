import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import TTSControls from "./TTSControls";
import SaveStoryButton from "./SaveStoryButton";
import DiscardStoryButton from "./DiscardStoryButton";
import GenerateStoryButton from "./GenerateStoryButton";
import { handleSave, handleDiscard } from "../utils/storyHandlers";

const Modal = ({
  show,
  onClose,
  title,
  genre,
  description,
  story,
  storyLength,
  storyId,
  onDelete,
}) => {
  const [showContinueBox, setShowContinueBox] = useState(false);
  const [additionalContent, setAdditionalContent] = useState("");
  const [newCharacter, setNewCharacter] = useState("");
  const [moral, setMoral] = useState("");
  const [endingDirection, setEndingDirection] = useState("");
  const [continuation, setContinuation] = useState("");

  useEffect(() => {
    // Stop TTS when the modal is closed
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [storyId]);

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

  const handleContinueStory = async () => {
    try {
      const response = await axios.post(`${backendUrl}/continuestory`, {
        originalStory: story,
        storyLength,
        storyGenre: genre,
        plotProgression: additionalContent,
        newCharacter,
        moral,
        endingDirection,
      });

      setContinuation(response.data.continuation);
    } catch (error) {
      console.error("Error continuing story:", error);
      alert("Failed to generate continuation. Please try again.");
    }
  };

  const saveContinuation = () => {
    const newStoryDescription = `Continuation of: ${description}`; // Update the description

    handleSave({
      userId, // Use the same userId as the original story
      storyTitle: `${title} (Continued)`, // Create a new title for the continuation
      storyLength, // Use the same length as the original story
      storyGenre: genre, // Use the same genre as the original story
      storyDescription: newStoryDescription, // Updated description for continuation
      story: continuation, // New content for the continuation
      backendUrl,
      onSuccess: (message) => {
        alert(message); // Alert success message
        onAddStory({
          id: Date.now(), // Temporary ID for the new story
          title: `${title} (Continued)`,
          genre,
          description: newStoryDescription,
          story: continuation,
          length: storyLength,
        });
        setContinuation("");
        setShowContinueBox(false);
      },
      onError: (errorMessage) => {
        alert(errorMessage); // Alert error message
      },
    });
  };

  const discardContinuation = () => {
    handleDiscard({
      setStoryTitle: () => {}, // No-op since title is static in Modal
      setStoryLength: () => {},
      setStoryGenre: () => {},
      setStoryDescription: () => {},
      setStory: setContinuation,
    });
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
            <TTSControls story={story} />
          </div>
          <span className="text-lg text-gray-600">{genre}</span>
          <p className="mb-4">{description}</p> {/* Display description */}
          <textarea
            className="w-full h-full max-h-[calc(80vh-150px)] p-2 border border-gray-300 rounded resize-none"
            readOnly
            value={story} // Display story
          />
          {/* Continue Story Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-black py-2 px-6 rounded hover:bg-blue-600 transition"
              onClick={() => setShowContinueBox(true)}
            >
              Continue Story
            </button>
          </div>
          {/* Continue Story Box */}
          {showContinueBox && (
            <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-100">
              <h3 className="text-lg font-bold mb-4">Continue Your Story</h3>
              {/* Plot Progression */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  What should happen next in the story?
                </label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-400 rounded"
                  placeholder="Describe the next part of the plot..."
                  value={additionalContent}
                  onChange={(e) => setAdditionalContent(e.target.value)}
                />
              </div>
              {/* Introduce a New Character */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Introduce a new character (optional)
                </label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-400 rounded"
                  placeholder="Describe the new character..."
                  value={newCharacter}
                  onChange={(e) => setNewCharacter(e.target.value)}
                />
              </div>
              {/* Morals */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Should this part of the story include a moral or lesson?
                </label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-400 rounded"
                  placeholder="Describe the moral or lesson..."
                  value={moral}
                  onChange={(e) => setMoral(e.target.value)}
                />
              </div>
              {/* Ending Direction */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  How should this part of the story end?
                </label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-400 rounded"
                  placeholder="Describe the ending direction..."
                  value={endingDirection}
                  onChange={(e) => setEndingDirection(e.target.value)}
                />
              </div>
              {/* Generate Story Button */}
              <div className="flex justify-end space-x-4">
                <GenerateStoryButton onGenerate={handleContinueStory} />
              </div>
              {/* Display Continuation */}
              {continuation && (
                <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
                  <h4 className="text-lg font-bold mb-2">Continuation:</h4>
                  <p className="text-blue-500">{continuation}</p>
                  {/* Save and Discard Buttons */}
                  <div className="flex justify-end space-x-4 mt-4">
                    <SaveStoryButton onSave={saveContinuation} />
                    <DiscardStoryButton onDiscard={discardContinuation} />
                  </div>
                </div>
              )}
            </div>
          )}
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
  storyLength: PropTypes.string.isRequired,
  storyId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Modal;
