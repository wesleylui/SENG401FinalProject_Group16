import PropTypes from "prop-types";

const SaveStoryButton = ({ onSave }) => {
  return (
    <button
      className="bg-white text-black p-6 border border-gray-400 rounded hover:bg-gray-100"
      onClick={onSave}
    >
      Save Story
    </button>
  );
};

SaveStoryButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SaveStoryButton;
