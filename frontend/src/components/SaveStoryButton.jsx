import PropTypes from "prop-types";

const SaveStoryButton = ({ onSave }) => {
  const handleClick = async () => {
    try {
      await onSave();
      alert("Story saved successfully!");
    } catch (error) {
      alert("Failed to save the story. Please try again.");
    }
  };

  return (
    <button
      className="bg-white text-black p-6 border border-gray-400 rounded hover:bg-gray-100"
      onClick={handleClick}
    >
      Save Story
    </button>
  );
};

SaveStoryButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SaveStoryButton;
