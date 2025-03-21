import PropTypes from "prop-types";

const DiscardStoryButton = ({ onDiscard }) => {
  return (
    <button
      className="bg-white text-black p-6 border border-gray-400 rounded hover:bg-gray-100"
      onClick={onDiscard}
    >
      Discard Story
    </button>
  );
};

DiscardStoryButton.propTypes = {
  onDiscard: PropTypes.func.isRequired,
};

export default DiscardStoryButton;
